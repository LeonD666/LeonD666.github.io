        let cart=[];
        function addToCart(name,price) {
            const item = cart.find(product => product.name === name);
              if(item) {
                item.quantity++;
              }
              else{
                cart.push({name, price, quantity:1})}
              updateCart();
        }
        function removeFromCart(name) {
            cart = cart.filter(p => p.name !== name);
            updateCart();
        }
        function updateCart() {
            const cartItems = document.getElementById('cart-items');
            const cartTotal = document.getElementById('cart-total');

            cartItems.innerHTML = '';
            let total = 0;

            cart.forEach((product, index) => {
                const subtotal = product.price * product.quantity;
                total += subtotal;

                const tr = document.createElement('tr');

                tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${ product.name }</td>
                <td>￥${ product.price }</td>
                <td>${product.quantity}</td>
                <td>${subtotal}</td>
                <td>
                    <button onclick="removeFromCart('${product.name}')">移除</button>
                </td>
                `;
                cartItems.appendChild(tr);
            });

            cartTotal.textContent = total;

        }
        
function goToPayment(method) {
    // 提取当前页面已生成的购物车HTML
    const cartHTML = document.getElementById('cart-items').innerHTML;
    const totalPrice = document.getElementById('cart-total').textContent;

    // 存到 sessionStorage
    sessionStorage.setItem('cartHTML', cartHTML);
    sessionStorage.setItem('cartTotal', totalPrice);
    sessionStorage.setItem('payMethod', method);  // 记录支付方式

    // 跳转
    window.location.href = method === 'wechat' 
        ? '微信支付-外卖.html' 
        : '支付宝支付-外卖.html';
}
