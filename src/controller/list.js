
const getAllEvents = async () => {
  try {
    // call api đến json-server lấy dữ liệu
    const res = await fetch(`http://localhost:3000/events`);
    const data = await res.json();
    // console.log(data);
    renderEvents(data)
  } catch (error) {
    console.log(error);
  }
}

const renderEvents = (list) => {
  // Hiển thị dữ liệu ra table
  const trLists = list.map((item,index) => {
    return `
      <tr>
        <th scope="row">${index+1}</th>
        <td>${item.title}</td>
        <td>
          <img height="70" src="${item.image}" alt="">
        </td>
        <td>${item.location}</td>
        <td>${item.status}</td>
        <td>
          <button onclick="handleDelete('${item.id}')" class="btn btn-danger">Xóa</button>
          <a href="edit.html?id=${item.id}" class="btn btn-warning">Sửa</a>
        </td>
      </tr>
    `
  }).join('');  //join chuyển mảng -> chuỗi

  // console.log(trLists);
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = trLists;
  
}

const handleDelete = async (id) => {
  // console.log(id);
  if(window.confirm("Bạn có chắc chắn muốn xóa không?")){
    try {
      const res = await fetch(`http://localhost:3000/events/${id}`, {
        method: 'delete'
      })
      if(res.ok){
        alert("Xóa thành công")
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const checkAuth = () => {
  const token = sessionStorage.getItem('token');
  if(!token){
    window.location.href = "login.html"
    alert("Bạn chưa đăng nhập")
  }
}

checkAuth();
getAllEvents();


const handleLogout = () => {
  if(sessionStorage.getItem('token')){
    sessionStorage.removeItem('token')
    window.location.href = "login.html"
  }
}