// Add this script at the end of your HTML file, before the closing </body> tag

// Create the modal HTML and add it to the page
function createCustomerModal() {
    const modalHTML = `
    <div class="modal fade" id="createCustomerModal" tabindex="-1" aria-labelledby="createCustomerModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="createCustomerModalLabel">Tạo mới khách hàng</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="createCustomerForm">
                        <div class="mb-3">
                            <label for="customerCode" class="form-label">Mã khách hàng</label>
                            <input type="text" class="form-control" id="customerCode" placeholder="Mã khách hàng(tự sinh nếu bỏ trống)">
                        </div>
                        <div class="mb-3">
                            <label for="customerName" class="form-label">Tên Khách hàng</label>
                            <input type="text" class="form-control" id="customerName" placeholder="Nhập tên khách hàng( bắt buộc )" required>
                        </div>
                        <div class="mb-3">
                            <label for="customerPhone" class="form-label">Số điện thoại</label>
                            <input type="tel" class="form-control" id="customerPhone">
                        </div>
                        <div class="mb-3">
                            <label for="customerEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" id="customerEmail" placeholder="Nhập email khách hàng ( ví dụ: kh10@gmail.com )">
                        </div>
                        <div class="mb-3">
                            <label for="customerAddress" class="form-label">Địa chỉ</label>
                            <input type="text" class="form-control" id="customerAddress">
                        </div>
                        <div class="mb-3">
                            <label for="customerNote" class="form-label">Ghi chú</label>
                            <textarea class="form-control" id="customerNote" rows="2"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="customerBirthday" class="form-label">Ngày sinh</label>
                            <input type="date" class="form-control" id="customerBirthday" placeholder="yyyy-mm-dd">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Giới tính</label>
                            <div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="customerGender" id="genderMale" value="male" checked>
                                    <label class="form-check-label" for="genderMale">Nam</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="customerGender" id="genderFemale" value="female">
                                    <label class="form-check-label" for="genderFemale">Nữ</label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Bỏ qua</button>
                    <button type="button" class="btn btn-primary" id="saveCustomerBtn">Lưu</button>
                </div>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Initialize the functionality once the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create the modal
    createCustomerModal();
    
    // Get the button that opens the modal
    const createCustomerBtn = document.querySelector('button.btn-primary i.fas.fa-user-plus').closest('button');
    
    // Set up the click event to show the modal
    createCustomerBtn.addEventListener('click', function() {
        const modal = new bootstrap.Modal(document.getElementById('createCustomerModal'));
        modal.show();
    });
    
    // Handle form submission
    const saveCustomerBtn = document.getElementById('saveCustomerBtn');
    saveCustomerBtn.addEventListener('click', function() {
        // Here you would collect form data and send to server
        // For this example, we'll just close the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('createCustomerModal'));
        
        // Form validation
        const customerName = document.getElementById('customerName').value;
        if (!customerName) {
            alert('Vui lòng nhập tên khách hàng!');
            return;
        }
        
        // Close the modal
        modal.hide();
        
        // You would typically add code here to add the new customer to the table
        alert('Đã lưu thông tin khách hàng thành công!');
    });
});