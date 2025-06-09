document.addEventListener('DOMContentLoaded', () => {
    let deviceList = [];
    const formElements = {
        price: document.getElementById('priceInput'),
        kaedoki: document.getElementById('kaedokiInput'),
        warranty: document.getElementById('warrantyInput'),
        mnpDiscount: document.getElementById('mnpDiscountInput'),
        newDiscount: document.getElementById('newDiscountInput'),
        changeDiscount: document.getElementById('changeDiscountInput'),
    };

    async function loadTasks(){
        const res = await fetch('http://localhost:3000/api/devices');
        deviceList = await res.json();
        const select = document.getElementById('deviceSelect');

        deviceList.forEach(device => {
            const option = document.createElement('option');
            option.value = device.name;
            option.textContent = device.name;
            select.appendChild(option);
        });
    }

    function setupDeviceSelectHandler(){
        const select = document.getElementById('deviceSelect');
        const newDeviceInput = document.getElementById('deviceNameInput');
        const editBtn = document.getElementById('edit');

        select.addEventListener('change', ()=>{
            const selectedName = select.value;

            if(selectedName === 'new'){
                select.style.display = 'none';
                newDeviceInput.style.display = 'inline-block';
                newDeviceInput.focus();
            }else{
                newDeviceInput.style.display = 'none';
                select.style.display = 'inline-block';
                const selectedDevice = deviceList.find(device => device.name === selectedName);
                if(selectedDevice){
                    formElements.price.value = selectedDevice.price;
                    formElements.kaedoki.value = selectedDevice.kaedoki;
                    formElements.warranty.value = selectedDevice.warranty;
                    formElements.mnpDiscount.value = selectedDevice.mnpDiscount;
                    formElements.newDiscount.value = selectedDevice.newDiscount;
                    formElements.changeDiscount.value = selectedDevice.changeDiscount;
                }
            }
        });

        editBtn.addEventListener('click', ()=>{
            newDeviceInput.style.display = 'none';
            select.style.display = 'inline-block';

            Object.values(formElements).forEach(input=>input.value='');

            select.value="";
        });
    }

    document.getElementById('device-form').addEventListener('submit',async(e) => {
        e.preventDefault();

        const deviceName = document.getElementById('deviceSelect').style.display !== 'none'
        ? document.getElementById('deviceSelect').value
        : document.getElementById('deviceNameInput').value;

        const payload = {
            name: deviceName,
            price: Number(formElements.price.value),
            kaedoki: Number(formElements.kaedoki.value),
            warranty: Number(formElements.warranty.value),
            discount:{
                mnp: Number(formElements.mnpDiscount.value),
                new: Number(formElements.newDiscount.value),
                change: Number(formElements.changeDiscount.value),
            }
        };

        try{
            const res = await fetch('http://localhost:3000/api/devices',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload),
            });

            if(!res.ok) throw new Error('サーバエラー');
            alert('保存しました');
            window.location.reload();
        }catch(err){
            console.log('保存エラー:',err);
            const errorText = await res.text();
            console.error('サーバエラー詳細',errorText);
            alert('保存に失敗しました');
        }
    });

    loadTasks().then(setupDeviceSelectHandler);
});