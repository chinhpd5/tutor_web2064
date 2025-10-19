
const handleSubmit = () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    // ngăn chặn hành vi tải trang
    e.preventDefault();

    // lấy các ô input
    const inputEmail = document.getElementById('email');
    const inputPassword = document.getElementById('password');

    // validate
    if(!inputEmail.value){
      alert("Không để trống email");
      inputEmail.focus();
      return;
    }

     if(!inputPassword.value || inputPassword.value.length < 6){
      alert("Không để trống password hoặc password nhỏ hơn 6 ký tự");
      inputPassword.focus();
      return;
    }

    // lấy data
    const data = {
      email: inputEmail.value,
      password: inputPassword.value
    }

    // console.log(data);
    register(data)

  })
}

handleSubmit();

const register = async (data) => {
  try {
    const res = await fetch(`http://localhost:3000/register`,{
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    if(res.ok){
      window.location.href = 'login.html'
      alert("Đăng ký thành công")
    }else{
      const message = await res.json();
      // console.log(message);
      alert(message)
    }
  } catch (error) {
    console.log(error);
  }
}