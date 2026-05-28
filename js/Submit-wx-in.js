async function submitInfo(){
    const payNumb = document.getElementById('payment-number').value.trim();
    const tableNumb = document.getElementById('position').value.trim();

    // 购物车不能为空的验证
    if(cartTotal == 0){
        tip.innerText = '购物车不能为空，请返回点餐页面，选取商品';
        tip.style.color = 'red';
        return;
    }


    // 固定位数验证
    if(payNumb.length !== 31){
        tip.innerText = '支付单号必须为31位';
        tip.style.color = 'red';
        return;
    }
    if(!/^\d{31}$/.test(payNumb)){
        tip.innerText = '支付单号必须为31位数字';
        tip.style.color = 'red';
        return;
    }

    // 提取表格数据...
    const cartContent = [];
    const rows = document.querySelectorAll('#cart-display tbody tr');
    rows.forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        cartContent.push({
            序号: index + 1,
            品名: cells[1].textContent,
            价格: cells[2].textContent.replace('￥', ''),
            数量: cells[3].textContent,
            金额: cells[4].textContent
        });
    });

    if(!tableNumb){
        tip.innerText = '位置不能为空';
        tip.style.color = 'red';
        return;
    }
    
    try{
        const res = await fetch('/api/submit',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                payNumb, 
                tableNumb,
                cartdisplay: cartContent,
                cartTotal
            })
        });
        const result = await res.json();
        tip.innerText = result.msg;
        tip.style.color = 'green';
        console.log(result.msg);
        
        document.getElementById('payment-number').value = '';
        document.getElementById('position').value = '';        
    }catch(err){
        tip.innerText = '提交失败';
        tip.style.color = 'red';
    }
}

// 页面加载时将购物车的内容传入
    const cartHTML = sessionStorage.getItem('cartHTML') || '';
    const cartTotal = sessionStorage.getItem('cartTotal') || '0';

    document.getElementById('cart-display').innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>序号</th><th>品名</th><th>价格</th>
                    <th>数量</th><th>金额</th><th>移除</th>
                </tr>
            </thead>
            <tbody>${cartHTML}</tbody>
        </table>
        <p>总价: ￥${cartTotal}</p>
    `;