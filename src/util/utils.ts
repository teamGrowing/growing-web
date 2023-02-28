// TODO: vh 문제 해결
function preventScroll() {
  document.body.style.overflow = 'hidden';
  return () => {
    document.body.style.overflow = 'unset';
  };
}

export default preventScroll;
