
        document.addEventListener('DOMContentLoaded', function() {
            const mpResidentSelect = document.getElementById('mpResident');
            const casteGroup = document.getElementById('casteGroup');
            const casteCategorySelect = document.getElementById('casteCategory');
            const mulniwasiGroup = document.getElementById('mulniwasiGroup');
            const incomeCertGroup = document.getElementById('incomeCertGroup');
            const casteCertGroup = document.getElementById('casteCertGroup');
            const form = document.getElementById('registrationForm');

            // Handle MP Resident selection
            mpResidentSelect.addEventListener('change', function() {
                const isFromMP = this.value === 'yes';
                
                if (isFromMP) {
                    casteGroup.classList.remove('hidden');
                    casteCategorySelect.required = true;
                } else {
                    // Hide all MP-specific fields
                    casteGroup.classList.add('hidden');
                    mulniwasiGroup.classList.add('hidden');
                    incomeCertGroup.classList.add('hidden');
                    casteCertGroup.classList.add('hidden');
                    
                    // Remove required attributes
                    casteCategorySelect.required = false;
                    document.getElementById('incomeCert').required = false;
                    document.getElementById('casteCert').required = false;
                    
                    // Reset values
                    casteCategorySelect.value = '';
                }
            });

            // Handle Caste Category selection
            casteCategorySelect.addEventListener('change', function() {
                const category = this.value;
                
                // Hide all conditional fields first
                mulniwasiGroup.classList.add('hidden');
                incomeCertGroup.classList.add('hidden');
                casteCertGroup.classList.add('hidden');
                
                // Remove required attributes
                document.getElementById('incomeCert').required = false;
                document.getElementById('casteCert').required = false;
                
                if (category === 'general') {
                    // Show only Mulniwashi (optional)
                    mulniwasiGroup.classList.remove('hidden');
                } else if (category === 'obc' || category === 'sc' || category === 'st') {
                    // Show all required documents
                    mulniwasiGroup.classList.remove('hidden');
                    incomeCertGroup.classList.remove('hidden');
                    casteCertGroup.classList.remove('hidden');
                    
                    // Make them required
                    document.getElementById('incomeCert').required = true;
                    document.getElementById('casteCert').required = true;
                }
            });

            // Form validation and submission
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic file size validation (5MB limit)
                const fileInputs = document.querySelectorAll('input[type="file"]');
                let fileSizeValid = true;
                
                fileInputs.forEach(input => {
                    if (input.files[0] && input.files[0].size > 5 * 1024 * 1024) {
                        alert(`File ${input.files[0].name} is too large. Maximum size is 5MB.`);
                        fileSizeValid = false;
                    }
                });
                
                if (!fileSizeValid) {
                    return;
                }
                
                // Phone number validation
                const phoneNumber = document.getElementById('phoneNumber').value;
                if (!/^\d{10}$/.test(phoneNumber)) {
                    alert('Please enter a valid 10-digit phone number.');
                    return;
                }
                
                // If all validations pass
                alert('Form submitted successfully!');
                
                // Optional: Reset form after successful submission
                // form.reset();
            });

            // Real-time phone number validation
            document.getElementById('phoneNumber').addEventListener('input', function() {
                const value = this.value.replace(/\D/g, ''); // Remove non-digits
                this.value = value.slice(0, 10); // Limit to 10 digits
            });
        });
    