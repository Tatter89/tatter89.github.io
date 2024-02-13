const track = document.querySelector("#slider");

const handleOnDown = (e) => {
  track.dataset.mouseDownAt = e.clientX;
};

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth;

  const percentage = (mouseDelta / maxDelta) * -100;
  const nextPercUnconst = parseFloat(track.dataset.prevPercentage) + percentage;
  const nextPercentage = Math.max(Math.min(nextPercUnconst, 0), -70);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translateX(${nextPercentage}%)`,
    },
    {
      duration: 300,
      fill: "forwards",
    }
  );
};

window.onmousedown = handleOnDown;
window.ontouchstart = (e) => handleOnDown(e.touches[0]);
window.onmouseup = handleOnUp;
window.ontouchend = (e) => handleOnUp(e.touches[0]);
window.onmousemove = handleOnMove;
window.ontouchmove = (e) => handleOnMove(e.touches[0]);
