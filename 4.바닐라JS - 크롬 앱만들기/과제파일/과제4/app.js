const clockTitle = document.querySelector(".js-clock");

function ChritsmasDday() {
  
  const Christmas = new Date(`${new Date().getFullYear()}-12-25T00:00:00`);
  const today = new Date();
  const milliSeconds = Christmas - today;
  const days = String(
    Math.floor(milliSeconds / (1000 * 60 * 60 * 24))
  ).padStart(2, "0");
  const hours = String(
    Math.floor((milliSeconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  ).padStart(2, "0");
  const minutes = String(
    Math.floor((milliSeconds % (1000 * 60 * 60)) / (1000 * 60))
  ).padStart(2, "0");
  const second = String(
    Math.floor((milliSeconds % (1000 * 60)) / 1000)
  ).padStart(2, "0");

  const TestMonth = Math.floor(milliSeconds / (1000 * 60 * 60 * 24));
  const TestHours = Math.floor((milliSeconds / (1000 * 60 * 60)) % 24);
  const TestMinutes = Math.floor((milliSeconds / (1000 * 60)) % 60);
  const TestSeconds = Math.floor((milliSeconds / 1000) % 60);
  console.log(TestMonth);
  console.log(TestHours);
  console.log(TestMinutes);
  console.log(TestSeconds);

  clockTitle.innerText = `${days}d ${hours}h ${minutes}m ${second}s `;
}
ChritsmasDday();
setInterval(ChritsmasDday, 1000);
