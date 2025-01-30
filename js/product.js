document.addEventListener('DOMContentLoaded', function() {
    // تغییر تصویر اصلی با کلیک روی تصاویر کوچک
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // حذف کلاس active از همه تصاویر کوچک
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // اضافه کردن کلاس active به تصویر کلیک شده
            this.classList.add('active');
            
            // تغییر تصویر اصلی
            // از data-src به جای src استفاده می‌کنیم
            const newImageSrc = this.getAttribute('data-src');
            if (newImageSrc) {
                mainImage.src = newImageSrc;
            }
        });
    });

    // کنترل تعداد محصول
    const minusBtn = document.querySelector('.minus');
    const plusBtn = document.querySelector('.plus');
    const qtyInput = document.querySelector('.quantity-selector input');

    minusBtn.addEventListener('click', () => {
        let value = parseInt(qtyInput.value);
        if (value > 1) {
            qtyInput.value = value - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        let value = parseInt(qtyInput.value);
        if (value < 10) {
            qtyInput.value = value + 1;
        }
    });

    // مدیریت تب‌ها
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // حذف کلاس active از همه تب‌ها
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // اضافه کردن کلاس active به تب کلیک شده
            this.classList.add('active');
            const tabId = this.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });

    // اضافه کردن به سبد خرید
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', function() {
        const quantity = parseInt(qtyInput.value);
        const color = document.querySelector('input[name="color"]:checked')?.value;
        
        // نمایش نوتیفیکیشن
        const notification = document.querySelector('.notification');
        notification.style.display = 'block';
        
        // مخفی کردن نوتیفیکیشن بعد از 3 ثانیه
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
        
        // اینجا می‌توانید عملیات اضافه کردن به سبد خرید را انجام دهید
        console.log(`محصول با تعداد ${quantity} و رنگ ${color} به سبد خرید اضافه شد`);
        
    
    });
}); 