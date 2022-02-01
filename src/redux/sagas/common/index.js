import { call, put } from "redux-saga/effects";

export function* fetchEntity(entity, apiFn, id, url) {
  const data = yield call(apiFn, url || id);

  if (data) yield put(entity.success(id, data));
  else yield put(entity.failure(id));
}
