const http = require("./routes/app");
require("./socket"); // 이렇게 불러오기만 해도 소켓에 연결이 됩니다.


http.listen(8080, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
});