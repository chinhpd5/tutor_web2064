const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const inputTitle = document.getElementById('title');
const inputLocation = document.getElementById('location');
const inputImage = document.getElementById('image');
const inputStatus = document.getElementById('status');

// console.log(id);

const getEventById = async () => {
  try {
    // lấy thông tin chi tiết
    const res = await fetch(`http://localhost:3000/events/${id}`);
    const data = await res.json();
    // console.log(data);

    // đổ dữ liệu vào form
    if(data){
      inputTitle.value = data.title;
      inputLocation.value = data.location;
      inputImage.value = data.image;
      inputStatus.value = data.status
    }

    
  } catch (error) {
    console.log(error);
  }
}

getEventById();

const handleUpdate = () => {
  // Định nghĩa sự kiện submit của form update
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // ngăn chặn hành vi tải trang

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
    updateEvent(data);
  })

}

const updateEvent = async (data) => {
  try {
    const res = await fetch(`http://localhost:3000/events/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if(res.ok){
      window.location.href = "list.html"
      alert("Cập nhật thành công")
    }
  } catch (error) {
    console.log(error);
  }
}

handleUpdate();