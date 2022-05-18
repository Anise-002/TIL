const quotes = [
    {
        quote : "너무 소심하고 까다롭게 자신의 행동을 고민하지 말라 . 모든 인생은 실험이다 . 더많이 실험할수록 더나아진다",
        author : "랄프 왈도 에머슨",
    },
    {
        quote : "오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.",
        author : "앙드레 말로",
    },
    {
        quote : "자신감 있는 표정을 지으면 자신감이 생긴다 ",
        author : "찰스다윈",
    },
    {
        quote : "좋은 성과를 얻으려면 한 걸음 한 걸음이 힘차고 충실하지 않으면 안 된다",
        author : "단테",
    },
    {
        quote : "일하는 시간과 노는 시간을 뚜렷이 구분하라 . 시간의 중요성을 이해하고 매순간을 즐겁게 보내고 유용하게 활용하라. 그러면 젋은 날은 유쾌함으로 가득찰것이고 늙어서도 후회할 일이 적어질것이며 비록 가난할 때라도 인생을 아름답게 살아갈수있다",
        author : "루이사 메이올콧",
    },
    {
        quote : "삶은 소유물이 아니라 순간 순간의 있음이다 영원한 것이 어디 있는가 모두가 한때일뿐 그러나 그 한때를 최선을 다해 최대한으로 살수 있어야 한다 삶은 놀라운 신비요 아름다움이다",
        author : "법정스님",
    },
    {
        quote : "꿈을 계속 간직하고 있으면 반드시 실현할 때가 온다.",
        author : "괴테",
    },
    {
        quote : "흔히 사람들은 기회를 기다리고 있지만 기회는 기다리는 사람에게 잡히지 않는 법이다. 우리는 기회를 기다리는 사람이 되기 전에 기회를 얻을 수 있는 실력을 갖춰야 한다. 일에 더 열중하는 사람이 되어야한다. ",
        author : "안창호",
    },
    {
        quote : "성공해서 만족하는 것은 아니다. 만족하고 있었기 때문에 성공한 것이다.",
        author : "알랭",
    },
    {
        quote : "자신을 내보여라. 그러면 재능이 드러날 것이다",
        author : "발타사르 그라시안",
    },
    {
        quote : "지금이야 말로 일할때다. 지금이야말로 싸울때다. 지금이야말로 나를 더 훌륭한 사람으로 만들때다 오늘 그것을 못하면 내일 그것을 할수있는가",
        author : "토마스 아켐피스",
    }
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

todaysQuote = quotes[Math.floor(Math.random()* quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;