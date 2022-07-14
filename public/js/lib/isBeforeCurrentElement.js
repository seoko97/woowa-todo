export const isBeforeCurrentElement = (element1, element2) => {
  if (element2.parentNode === element1.parentNode) {
    for (let cur = element1.previousSibling; cur; cur = cur.previousSibling) {
      if (cur === element2) return true;
    }
  }

  return false;
};
