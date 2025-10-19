
const handleAdd = () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // ngăn chặn hành vi tải trang
    
    // lấy input
    const inputTitle = document.getElementById('title');
    const inputLocation = document.getElementById('location');
    const inputImage = document.getElementById('image');
    const inputStatus = document.getElementById('status');

    // console.log({inputTitle,inputLocation,inputImage,inputStatus});

    // validate (có thể bỏ qua)
    if(!inputTitle.value){
      alert("Cần nhập tên sự kiện");
      inputTitle.focus();
      return;
    }

    if(!inputLocation.value){
      alert("Cần nhập đại chỉ");
      inputLocation.focus();
      return;
    }

    if(!inputImage.value){
      alert("Cần nhập hình ảnh");
      inputImage.focus();
      return;
    }

    const data = {
      title: inputTitle.value,
      location: inputLocation.value,
      image: inputImage.value,
      status : inputStatus.value
    }

    // console.log(data);
    addEvent(data)
  })

}

const addEvent = async (data) => {
  try {
    const res = await fetch(`http://localhost:3000/events`,{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if(res.ok){
      window.location.href = 'list.html'
      alert("Thêm thành công");
    }
  } catch (error) {
    console.log(error);
  }
}

handleAdd();