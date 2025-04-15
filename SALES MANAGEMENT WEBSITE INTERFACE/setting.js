// settingjs.js
document.addEventListener('DOMContentLoaded', function() {
    // Get the create employee button
    const createEmployeeBtn = document.querySelector('.settings-header .btn-primary');
    
    // Get the modal elements from the DOM or create them if they don't exist
    let modalOverlay = document.getElementById('modalOverlay');
    let modalForm = document.getElementById('employeeModal');
    
    // If modal doesn't exist in the DOM, create it
    if (!modalOverlay) {
        // Create modal overlay
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'modalOverlay';
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.top = '0';
        modalOverlay.style.left = '0';
        modalOverlay.style.width = '100%';
        modalOverlay.style.height = '100%';
        modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modalOverlay.style.zIndex = '1000';
        modalOverlay.style.display = 'none';
        
        // Create modal form
        modalForm = document.createElement('div');
        modalForm.id = 'employeeModal';
        modalForm.classList.add('modal-dialog');
        modalForm.style.position = 'fixed';
        modalForm.style.top = '50%';
        modalForm.style.left = '50%';
        modalForm.style.transform = 'translate(-50%, -50%)';
        modalForm.style.backgroundColor = 'white';
        modalForm.style.padding = '20px';
        modalForm.style.borderRadius = '5px';
        modalForm.style.zIndex = '1001';
        modalForm.style.width = '600px';
        modalForm.style.display = 'none';
        
        // Modal header with title and close button
        modalForm.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-user me-2"></i>
                        THÊM TÀI KHOẢN ĐĂNG NHẬP
                    </h5>
                    <button type="button" class="btn-close" id="closeModal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="employeeForm">
                        <div class="mb-3">
                            <label for="employeeName" class="form-label">Tên nhân viên</label>
                            <input type="text" class="form-control" id="employeeName" placeholder="Nhập tên nhân viên">
                        </div>
                        <div class="mb-3">
                            <label for="employeeCode" class="form-label">Mã nhân viên</label>
                            <input type="text" class="form-control" id="employeeCode" placeholder="Nhập mã nhân viên">
                        </div>
                        <div class="mb-3">
                            <label for="employeeEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" id="employeeEmail" placeholder="Nhập email của bạn">
                        </div>
                        <div class="mb-3">
                            <label for="employeePassword" class="form-label">Mật khẩu</label>
                            <input type="password" class="form-control" id="employeePassword" placeholder="Nhập Mật khẩu">
                        </div>
                        <div class="mb-3">
                            <label for="employeeGroup" class="form-label">Nhóm người dùng</label>
                            <select class="form-select" id="employeeGroup">
                                <option value="" selected disabled>Chọn nhóm người dùng</option>
                                <option value="admin">Admin</option>
                                <option value="manager">Quản lý</option>
                                <option value="employee">Nhân viên</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="employeeStore" class="form-label">Kho làm việc</label>
                            <select class="form-select" id="employeeStore">
                                <option value="" selected disabled>Chọn kho làm việc</option>
                                <option value="store1">Cửa hàng số 1</option>
                                <option value="store2">Cửa hàng số 2</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="cancelBtn">Bỏ qua</button>
                    <button type="button" class="btn btn-primary" id="saveBtn">
                        <i class="fas fa-save me-1"></i> Lưu
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modalOverlay);
        document.body.appendChild(modalForm);
    }
    
    // Add event listener to the create employee button
    createEmployeeBtn.addEventListener('click', function() {
        // Show the modal and overlay
        modalOverlay.style.display = 'block';
        modalForm.style.display = 'block';
    });
    
    // Handle close modal events
    document.addEventListener('click', function(event) {
        if (event.target.id === 'closeModal' || event.target.id === 'cancelBtn' || event.target === modalOverlay) {
            modalOverlay.style.display = 'none';
            modalForm.style.display = 'none';
        }
    });
    
    // Handle save button
    document.addEventListener('click', function(event) {
        if (event.target.id === 'saveBtn') {
            // Here you would normally save the form data
            // For this example, we'll just close the modal
            modalOverlay.style.display = 'none';
            modalForm.style.display = 'none';
            
            // You would typically add code here to:
            // 1. Validate form data
            // 2. Send data to server
            // 3. Update the employee table
        }
    });
});