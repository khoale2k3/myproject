// Create the AddStore.js file with this content
document.addEventListener('DOMContentLoaded', function() {
    // Get the "Thêm kho" button
    const addStoreButton = document.querySelector('.btn-primary');
    
    // Function to show the modal
    function showAddStoreModal() {
        // Create the modal if it doesn't exist
        if (!document.querySelector('#addStoreModal')) {
            const modalHTML = `
                <div class="modal fade" id="addStoreModal" tabindex="-1" aria-labelledby="addStoreModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addStoreModalLabel">
                                    <i class="fas fa-warehouse me-2"></i>Thêm kho
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="storeName" class="form-label">Tên Kho</label>
                                    <input type="text" class="form-control" id="storeName" placeholder="Nhập tên kho">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Bỏ qua</button>
                                <button type="button" class="btn btn-primary" id="saveStoreButton">Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            // Add event listener for the save button
            const saveButton = document.getElementById('saveStoreButton');
            if (saveButton) {
                saveButton.addEventListener('click', function() {
                    const storeName = document.getElementById('storeName').value;
                    if (storeName.trim()) {
                        // Get the table and add a new row
                        const table = document.querySelector('.warehouse-table tbody');
                        const rowCount = table.rows.length;
                        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
                        
                        const newRow = table.insertRow();
                        newRow.innerHTML = `
                            <td>${rowCount + 1}</td>
                            <td>${storeName}</td>
                            <td>${currentDate}</td>
                        `;
                        
                        // Close the modal
                        const modal = bootstrap.Modal.getInstance(document.getElementById('addStoreModal'));
                        modal.hide();
                    }
                });
            }
        }
        
        // Show the modal
        const modal = new bootstrap.Modal(document.getElementById('addStoreModal'));
        modal.show();
    }
    
    // Add click event to the "Thêm kho" button
    if (addStoreButton) {
        addStoreButton.addEventListener('click', showAddStoreModal);
    }
});