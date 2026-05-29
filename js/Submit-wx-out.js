async function submitInfo(){    
    const payNumb = document.getElementById('payment-number').value.trim();
    const custName = document.getElementById('name').value.trim();
    const custPhone = document.getElementById('phone').value.trim();
    const custAddr = document.getElementById('address').value.trim();
    
    // 购物车不能为空的验证
    if(cartTotal == 0){
        tip.innerText = '购物车不能为空，请返回点餐页面，选取商品';
        tip.style.color = 'red';
        return;
    }

    // 支付订单号码固定位数验证
    if(payNumb.length !== 31){
        tip.innerText = '微信支付单号必须为31位';
        tip.style.color = 'red';
        return;
    }
    if(!/^\d{31}$/.test(payNumb)){
        tip.innerText = '微信支付单号必须为31位数字';
        tip.style.color = 'red';
        return;
    }

    // 名称和地址不能为空验证
    if(!custName || !custAddr){
        tip.innerText = '名称和地址不能为空';
        tip.style.color = 'red';
        return;
    }
    
    
    // 手机号固定位数验证
    if(custPhone.length !== 11){
        tip.innerText = '手机号必须为11位';
        tip.style.color = 'red';
        return;
    }
    if(!/^\d{11}$/.test(custPhone)){
        tip.innerText = '手机号必须为11位数字';
        tip.style.color = 'red';
        return;
    }

    // 将用户提交的内容导入supabase
    submitMessage(payNumb, custName, custPhone, custAddr);  // ← 调用 Supabase 的提交函数


    // 提取购物车内容表格数据...
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

const supabase = supabase.createClient(
'https://vslbcwnuqlgegvfnrfej.supabase.co/rest/v1/',
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzbGJjd251cWxnZWd2Zm5yZmVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMzY0NjIsImV4cCI6MjA5NTYxMjQ2Mn0.tSKIrkx4VoAzxllVq34Xme8ToAP1yHLDI_rCMDWykEQ'
);

// 向Supabase提交表单时调用这个函数
    async function submitMessage(payNumb, custName, custPhone, custAddr) {
    const { error } = await supabase
        .from('messages')
        .insert([{ 
        name: custName, 
        payId: payNumb, 
        phone: custPhone, 
        address: custAddr 
        }]);
    
    if (error) alert('提交失败');
    else alert('提交成功');
      
    // 清空网页
    document.getElementById('payment-number').value = '';
    document.getElementById('name').value = '';
    document.getElementById('phone').value = ''; 
    document.getElementById('address').value = ''; 

    }    