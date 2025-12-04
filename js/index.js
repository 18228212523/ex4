// ★★★ 实验四：首页交互功能 ★★★
document.addEventListener('DOMContentLoaded', function() {

    // 1. 增强导航栏悬停效果
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255,255,255,0.1)';
            this.style.borderRadius = '4px';
            this.style.padding = '5px 10px';
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'all 0.3s ease';
        });
        link.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.transform = '';
        });
    });

    // 2. 轮播图功能
    const images = document.querySelectorAll('.carousel-inner img');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentIndex = 0;

    function showImage(index) {
        // 隐藏所有图片
        images.forEach(img => img.classList.remove('active'));
        // 显示当前索引的图片
        images[index].classList.add('active');
        currentIndex = index;
    }

    // 下一张
    nextBtn.addEventListener('click', function() {
        let nextIndex = (currentIndex + 1) % images.length;
        showImage(nextIndex);
    });

    // 上一张
    prevBtn.addEventListener('click', function() {
        let prevIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(prevIndex);
    });

    // 自动轮播（可选）
    setInterval(() => {
        let nextIndex = (currentIndex + 1) % images.length;
        showImage(nextIndex);
    }, 3000); // 3秒切换一次

    console.log('首页交互加载完成！');
});