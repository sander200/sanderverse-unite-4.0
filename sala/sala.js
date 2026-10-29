// Sala de 3. Firebase Realtime Database, plano Spark.
// A config não fica neste ficheiro. Vem do ecrã, depois de criares o projeto.

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getDatabase, ref, set, update, onValue, remove, get } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const LETRAS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const LUGARES = 3;

export function ligar(config) {
  const app = initializeApp(config);
  return { auth: getAuth(app), db: getDatabase(app) };
}

export async function entrarAnonimo(auth) {
  const cred = await signInAnonymously(auth);
  return cred.user.uid;
}

function codigoNovo() {
  let s = "";
  for (let i = 0; i < 6; i++) s += LETRAS[Math.floor(Math.random() * LETRAS.length)];
  return s;
}

export async function criarSala(db, uid, nome) {
  for (let t = 0; t < 5; t++) {
    const code = codigoNovo();
    const snap = await get(ref(db, "rooms/" + code));
    if (snap.exists()) continue;
    const matchId = Math.floor(Math.random() * 1e9);
    await set(ref(db, "rooms/" + code), {
      hostUid: uid,
      matchId,
      open: true,
      players: { [uid]: { nome, seat: 0, ready: true } },
    });
    return { code, matchId };
  }
  throw new Error("sem código livre");
}

export async function juntar(db, code, uid, nome) {
  const sala = ref(db, "rooms/" + code);
  const snap = await get(sala);
  if (!snap.exists() || snap.val().open !== true) throw new Error("sala fechada");
  const players = snap.val().players || {};
  const ids = Object.keys(players);
  if (ids.length >= LUGARES && !players[uid]) throw new Error("sala cheia");
  const seat = players[uid] ? players[uid].seat : ids.length;
  await update(ref(db, "rooms/" + code + "/players/" + uid), { nome, seat, ready: true });
  return { code, matchId: snap.val().matchId, seat };
}

export function ouvir(db, code, fn) {
  return onValue(ref(db, "rooms/" + code), (snap) => fn(snap.val()));
}

export function pulso(db, code, uid, state) {
  return update(ref(db, "rooms/" + code + "/state"), { ...state, t: Date.now(), by: uid });
}

export function stick(db, code, uid, input) {
  return update(ref(db, "rooms/" + code + "/players/" + uid), { input, t: Date.now() });
}

export async function fechar(db, code) {
  await update(ref(db, "rooms/" + code), { open: false });
  await remove(ref(db, "rooms/" + code));
}
