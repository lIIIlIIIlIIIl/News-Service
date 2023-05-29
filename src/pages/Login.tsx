import "../style/login.css";

import { useRouter } from "../hooks/useRouter";

interface User {
  id: string;
  password: string;
}

const userData: User[] = [
  { id: "codestates1", password: "12345678" },
  { id: "codestates2", password: "87654321" },
];

const checkUserFuc = ({ id, password }: User) => {
  let result = "fail";

  userData.forEach((data) => {
    if (id === data.id && password === data.password) result = "success";
  });

  return result;
};

const Login = () => {
  const { routeTo } = useRouter();

  const loginSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const userInfo = {
      id: formData.get("id") as string,
      password: formData.get("password") as string,
    };
    const loginResult = checkUserFuc(userInfo);

    if (loginResult === "fail") {
      alert("아이디 또는 비밀번호를 확인해주세요.");
      return;
    }
    routeTo("/");
  };
  return (
    <div className="login-wrapper">
      <h1>로그인</h1>
      <form className="login-form" onSubmit={loginSubmitHandler}>
        <label>
          아이디
          <input type="text" name="id" />
        </label>
        <label>
          비밀번호
          <input type="password" name="password" />
        </label>
        <button type="submit" className="login-wrapper-button">
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
