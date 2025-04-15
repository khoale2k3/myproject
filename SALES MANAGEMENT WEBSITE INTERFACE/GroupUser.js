// Add this JavaScript to your GroupUser.html file
document.addEventListener('DOMContentLoaded', function() {
    // Get the "Thêm nhóm mới" button
    const addGroupButton = document.querySelector('.btn-primary.btn-sm');
    
    // Get the close button (×) in the modal
    const closeButton = document.querySelector('.modal .close');
    
    // Get the "Bỏ qua" button in the modal
    const cancelButton = document.querySelector('.modal .btn-secondary');
    
    // Get the "Lưu" button in the modal
    const saveButton = document.querySelector('.modal .btn-primary');
    
    // Function to show the modal
    function showModal() {
        // Create the modal if it doesn't exist
        if (!document.querySelector('#addGroupModal')) {
            const modalHTML = `
                <div class="modal fade" id="addGroupModal" tabindex="-1" aria-labelledby="addGroupModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addGroupModalLabel">
                                    <i class="fas fa-users me-2"></i>Thêm nhóm người dùng
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="groupName" class="form-label">Tên Nhóm</label>
                                    <input type="text" class="form-control" id="groupName" placeholder="Nhập tên nhóm người dùng">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Bỏ qua</button>
                                <button type="button" class="btn btn-primary">Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
        
        // Show the modal
        const modal = new bootstrap.Modal(document.getElementById('addGroupModal'));
        modal.show();
    }
    
    // Add click event to the "Thêm nhóm mới" button
    if (addGroupButton) {
        addGroupButton.addEventListener('click', showModal);
    }
});