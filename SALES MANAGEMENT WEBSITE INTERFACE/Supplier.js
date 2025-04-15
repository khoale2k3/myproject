// Create the modal HTML and add it to the page
function createSupplierModal() {
    const modalHTML = `
    <div class="modal fade" id="createSupplierModal" tabindex="-1" aria-labelledby="createSupplierModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="createSupplierModalLabel">Tạo mới nhà cung cấp</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="createSupplierForm">
                        <div class="mb-3">
                            <label for="supplierCode" class="form-label">Mã nhà cung cấp</label>
                            <input type="text" class="form-control" id="supplierCode" placeholder="Mã nhà cung cấp (Tự sinh nếu bỏ trống)">
                        </div>
                        <div class="mb-3">
                            <label for="supplierName" class="form-label">Tên nhà cung cấp</label>
                            <input type="text" class="form-control" id="supplierName" placeholder="Nhập tên nhà cung cấp (bắt buộc)" required>
                        </div>
                        <div class="mb-3">
                            <label for="supplierPhone" class="form-label">Số điện thoại</label>
                            <input type="tel" class="form-control" id="supplierPhone" placeholder="Số điện thoại">
                        </div>
                        <div class="mb-3">
                            <label for="supplierEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" id="supplierEmail" placeholder="Nhập email nhà cung cấp (ví dụ: kh10@gmail.com)">
                        </div>
                        <div class="mb-3">
                            <label for="supplierAddress" class="form-label">Địa chỉ</label>
                            <input type="text" class="form-control" id="supplierAddress">
                        </div>
                        <div class="mb-3">
                            <label for="supplierTaxCode" class="form-label">Mã số thuế</label>
                            <input type="text" class="form-control" id="supplierTaxCode">
                        </div>
                        <div class="mb-3">
                            <label for="supplierNote" class="form-label">Ghi chú</label>
                            <textarea class="form-control" id="supplierNote" rows="3"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Bỏ qua</button>
                    <button type="button" class="btn btn-primary" id="saveSupplierBtn">Lưu</button>
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
    createSupplierModal();
    
    // Get the button that opens the modal
    const createSupplierBtn = document.querySelector('.btn-primary i.fas.fa-plus').closest('button');
    
    // Set up the click event to show the modal
    createSupplierBtn.addEventListener('click', function() {
        const modal = new bootstrap.Modal(document.getElementById('createSupplierModal'));
        modal.show();
    });
    
    // Handle form submission
    const saveSupplierBtn = document.getElementById('saveSupplierBtn');
    saveSupplierBtn.addEventListener('click', function() {
        // Form validation
        const supplierName = document.getElementById('supplierName').value;
        if (!supplierName) {
            alert('Vui lòng nhập tên nhà cung cấp!');
            return;
        }
        
        // Close the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('createSupplierModal'));
        modal.hide();
        
        // You would typically add code here to add the new supplier to the table
        alert('Đã lưu thông tin nhà cung cấp thành công!');
    });
});