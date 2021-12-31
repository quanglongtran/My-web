const btnEffect = document.getElementsByClassName('btn-effect');
const iconEffect = document.getElementsByClassName('icon-effect');
const btns = document.getElementsByClassName('btns');
const icons = document.getElementsByClassName('icons');
const close = document.getElementsByClassName('close');
const messages = document.getElementsByClassName('messages');
const menuItems = document.getElementsByClassName('menu-items');
const menuItemLink = document.getElementsByClassName('menu-item-link');
const animateText = document.getElementsByClassName('animate-text');
const colorRange = document.getElementsByClassName('color-range')[0];
const consumption = document.getElementsByClassName('consumption')[0];
var coinValue = 2;
var inputCoinIn = document.getElementsByClassName('input-coin-in')[0];
var inputCoinOut = document.getElementsByClassName('input-coin-out')[0];
var coinIn;
var coinOut;
const coinSound = document.getElementsByClassName('coin-sound')[0];
const tingSound = document.getElementsByClassName('ting-sound')[0];
const errorSound = document.getElementsByClassName('error-sound')[0];
var clickSoundEffect = document.getElementsByClassName('click-sound-effect');
var effectReady = true;
const errorMessage = document.getElementsByClassName('error-message')[0];
const closeErorrMessage = document.getElementsByClassName('error-message__close')[0];
consumption.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        if (consumption.value.length > 3) {
            consumption.value = consumption.value.substr(0, consumption.value.length - 1)
        }

    }
})

consumption.addEventListener('blur', function () {

})

inputCoinIn.addEventListener('input', function () {
    if (inputCoinIn.value !== 'infinite') {
        coinValue = Number(consumption.value);
    } else {
        consumption.value = 0;
    }
})

document.addEventListener('keydown', (reload) => {
    // console.log(reload.key)
    if (reload.key == ' ') {
        var clearReload = setTimeout(() => {
            window.location.reload();
        }, 500);
        document.addEventListener('keyup', (reload) => {
            clearInterval(clearReload)
        })
    }
})
for (let i of btnEffect) {
    i.addEventListener('mouseover', function (evt) {
        if (inputCoinOut.value >= coinValue) {
            i.style.filter = 'brightness(110%)';
            i.style.boxShadow = '0 0 20px rgba(0,0,0,0.4)';
            isReady = true;
        }
    })
    i.addEventListener('mousedown', function (evt) {
        if (isReady) {
            i.style.filter = 'brightness(80%)';
        }
    })
    document.addEventListener('mouseup', function (evt) {
        if (isReady) {
            i.style.filter = 'brightness(100%)';
        }
    })
    i.addEventListener('mouseout', function (evt) {
        i.style.filter = 'brightness(100%)';
        i.style.boxShadow = '';
        isReady = false;
    })
}

for (let i of iconEffect) {
    i.addEventListener('mouseover', function (evt) {
        if (inputCoinOut.value >= coinValue) {
            i.style.filter = 'brightness(110%)';
            i.style.fontSize = '120%';
            isReady = true;
        }
    })
    i.addEventListener('mousedown', function (evt) {
        if (isReady) {
            i.style.filter = 'brightness(80%)';
            i.style.fontSize = '80%';
        }
    })
    document.addEventListener('mouseup', function (evt) {
        if (isReady) {
            i.style.filter = 'brightness(110%)';
            i.style.fontSize = '120%';
        }
    })
    i.addEventListener('mouseout', function (evt) {
        i.style.filter = 'brightness(100%)';
        i.style.fontSize = '120%';
        isReady = false;
    })
}

for (let i = 0; i < clickSoundEffect.length; i++) {
    clickSoundEffect[i].addEventListener('mousedown', function (event) {
        document.getElementsByClassName('click-sound')[0].pause()
        document.getElementsByClassName('click-sound')[0].play()
        setTimeout(() => {
            document.getElementsByClassName('click-sound')[0].pause()
            document.getElementsByClassName('click-sound')[0].play()
        }, 55)
    })
}

function errorMessageFn(content) {
    errorMessage.classList.add('active');
    document.getElementsByClassName('error-message__desc')[0].innerText = content;
    setTimeout(() => { errorMessage.classList.remove('active') }, 5000);
}
closeErorrMessage.onclick = function () {
    errorMessage.classList.remove('active');
}

var estimateOut;
var interger;
var sum;
document.getElementsByClassName('open-coin-form')[0].onclick = function () {
    document.getElementsByClassName('open-coin-form')[0].addEventListener('mouseover', () => {

    })
    document.getElementsByClassName('coin')[0].classList.add('active');
    document.addEventListener('keydown', function (event) {
        let e = event.code;
        if (e == 'Escape') {
            document.getElementsByClassName('coin')[0].classList.remove('active');
        }
    })
    inputCoinIn.addEventListener('input', () => {
        if (!(isNaN(inputCoinIn.value))) {
            coinIn = Number(inputCoinIn.value);
            coinOut = Number(inputCoinOut.value);
        }
        if (coinIn > 0 && !(isNaN(inputCoinIn.value)) && coinIn <= 999) {
            if (coinIn > coinOut) {
                estimateOut = (inputCoinIn.value - inputCoinOut.value) / 100;
            } else if (coinIn <= coinOut) {
                estimateOut = (inputCoinOut.value - inputCoinIn.value) / 100;
            }
        } else if (inputCoinIn.value < 0 && !(isNaN(inputCoinIn.value))) {
            coinIn = Number(inputCoinIn.value);
            coinOut = Number(inputCoinOut.value);
            interger = (coinIn * - 1) - coinOut;
            if (interger < 0) {
                sum = coinIn + coinOut;
                estimateOut = (coinOut - sum) / 100;
            } else {
                estimateOut = coinOut / 100;
            }
        } else if (coinIn > 999) {
            estimateOut = (999 - inputCoinOut.value) / 100;
        } else {
            estimateOut = 0;
        }
        inputEstimate.value = estimateOut;
        function est(x) {
            var clearEstimate = setInterval(function () {
                estimateOut -= x;
                inputEstimate.value = estimateOut;
                if (estimateOut <= 0) {
                    clearInterval(clearEstimate);
                    inputEstimate.value = `0:00`;
                    if (Number.isInteger(estimateOut)) {
                        inputEstimate.value = `${estimateOut}:00`
                        console.log('ok')
                    }
                }
            }, 52.5)
        }
        document.getElementsByClassName('coin')[0].addEventListener('submit', function (event) {
            if (!(isNaN(estimateOut))) {
                est(0.017);
            } else {
                estimateOut = 0;
            }

        })
        if (Number.isInteger(estimateOut)) {
            inputEstimate.value = `${estimateOut}:00`
        }
    })
}

var inputEstimate = document.getElementsByClassName('estimate')[0];

var saveTest;
var coinIn_interger;
document.getElementsByClassName('coin')[0].addEventListener('submit', submitCoin);
function submitCoin() {
    saveTest = inputCoinOut.value;
    coinValue = Number(consumption.value)
    if (!(isNaN(Number(inputCoinIn.value)))) {
        addCoin();
        coinIn_interger = Number(inputCoinIn.value);
        coinIn = Math.round(coinIn_interger)
        coinOut = Number(inputCoinOut.value);
    } else {
        if (inputCoinIn.value == 'infinite' || inputCoinIn.value == 'rotation luck' || inputCoinIn.value.indexOf('set') == 0) {
            addCoinCommand();
        } else {
            errorMessageFn('Giá trị nhập vào phải là số!!')
        }
    }
}

function addCoin() {
    if (inputCoinIn.value <= 999 && inputCoinIn.value != '') {
        if (coinIn == '') {
            coinIn = saveTest;
        }
        if (coinIn > coinOut && coinIn >= 0) {
            var clearAddCoin;
            intervalCoin(5);
        } else if (coinIn <= coinOut && coinIn >= 0) {
            var clearRemoveCoin;
            intervalCoin(-5);
        } else if (coinIn < 0) {
            var coinAbs = Math.abs(inputCoinIn.value);
            var result = Math.round(inputCoinOut.value - coinAbs);
            intervalCoin(-5);
        }
    } else if (inputCoinIn.value == '') {
        errorMessageFn('Giá trị nhập vào không được để trống!!');
    } else if (inputCoinIn.value > 999) {
        errorMessageFn('Giá trị nhập vào phải nhỏ hơn 1000!!')
    }
    document.addEventListener('keydown', function (event) {
        let e = event.code;
        if (e == 'Escape') {
            document.getElementsByClassName('coin-form')[0].classList.remove('active');
        }
    })
    function intervalCoin(x) {
        document.getElementsByClassName('enter-coin')[0].style.pointerEvents = 'none';
        clearAddCoin = setInterval(() => {
            coinSound.play();
            coinRangeBar.style.width = (inputCoinOut.value / 999) * 100 + '%';
            inputCoinOut.value = Number(inputCoinOut.value) + x;
            coinOut = Number(inputCoinOut.value);
            inputCoinIn.readOnly = true;
            fontSize();
            if (coinIn <= coinOut && x > 0) {
                stop(1);
                console.log('cong')
            } else if (coinIn >= coinOut && x < 0) {
                stop(1);
                console.log('tru')
            } else if (coinOut <= result && x < 0) {
                stop(0);
                console.log('tru-')
            } else if (coinOut <= 0) {
                inputCoinOut.value = 0;
                console.log('tru=0')
            }
        }, 52.5);
    }
    function stop(y) {
        coinSound.pause();
        tingSound.play();
        clearInterval(clearRemoveCoin);
        clearInterval(clearAddCoin);
        if (y == 1) {
            inputCoinOut.value = Math.round(Number(inputCoinIn.value));
        } else {
            inputCoinOut.value = Math.round(result);
        }
        inputCoinIn.value = '';
        inputCoinIn.readOnly = false;
        document.getElementsByClassName('enter-coin')[0].style.pointerEvents = 'fill';
    }
}

function addCoinCommand() {
    document.getElementsByClassName('coin')[0].addEventListener('submit', submitCoin);
    if (inputCoinIn.value == 'infinite') {
        document.getElementsByClassName('open-coin-form')[0].classList.add('active');
        errorMessageFn('Vô hạn tiền');
        inputCoinIn.value = '';
        coinValue = 0;
        document.getElementsByClassName('success-sound')[0].play();
    }
    if (inputCoinIn.value == 'rotation luck') {
        document.getElementsByClassName('rotation-luck')[0].classList.add('active');
        document.getElementsByClassName('rotation-luck-close')[0].onclick = function () {
            document.removeEventListener('keydown', fairPlay);
            document.getElementsByClassName('rotation-luck')[0].classList.remove('active');
        }
        errorMessageFn('Vòng quay may mắn')
        inputCoinIn.value = '';
    }
    if (inputCoinIn.value.indexOf('set') == 0) {
        coinValue = Number(inputCoinIn.value.slice(4));
        consumption.value = coinValue;
        errorMessageFn(`Giá trị tiêu thụ bằng ${coinValue}`)
        inputCoinIn.value = ''
    }
}

inputCoinIn.addEventListener('input', function (event) {
    if (inputCoinIn.value != 'infinite') {
        document.getElementsByClassName('open-coin-form')[0].classList.remove('active');
        coinValue = 2;
    }
})


var readyToDrag = false;
document.getElementsByClassName('coin-range')[0].addEventListener('mousedown', function (e) {
    readyToDrag = true;
})

const coinRangeBar = document.getElementsByClassName('coin-range-bar')[0];
const coinRangeBarPredict = document.getElementsByClassName('coin-range-bar-predict')[0];
const coinRangeCircle = document.getElementsByClassName('coin-range-circle')[0];

document.addEventListener('mouseover', function (e) {
    const left = coinRange.getBoundingClientRect().left
    const width = coinRange.getBoundingClientRect().width;
    const max = width + left;
    const clientX = e.clientX;
    const percent = ((clientX - left) / width) * 100;

    inputCoinIn.oninput = function () {
        if (inputCoinIn.value < 1000) {
            coinRangeBarPredict.style.width = (Number(inputCoinIn.value) / 999) * 100 + '%';
        } else if (inputCoinIn.value >= 1000) {
            coinRangeBarPredict.style.width = '100%'
        }
    }

    fontSize();

    if (readyToDrag && clientX >= left && clientX <= max) {
        if (inputCoinIn.value != 0 || inputCoinIn.value != '') {
            inputCoinIn.focus();
        } else {
            inputCoinIn.blur();
            inputCoinIn.value = ''
        }
        coinRangeBar.style.width = Math.floor(percent) + '%'
        var roudingCoin = Math.floor((percent / 100) * 999);
        inputCoinIn.value = roudingCoin;
        // inputCoinOut.value = inputCoinIn.value;
        coinRangeBarPredict.style.width = (Number(inputCoinIn.value) / 999) * 100 + '%';
        document.getElementsByClassName('open-coin-form')[0].classList.remove('active')
    }
})

document.addEventListener('mouseup', function (e) {
    readyToDrag = false;
});

// (0 & 45) ($goodluck) (20 deg)
// (45 & 90) ($10) (60 deg)
// (90 & 135) ($2) (110 deg)
// (135 & 180) ($5) (158 deg)
// (180 & 225) ($3) (202 deg)
// (225 & 270) ($more) (248deg)
// (270 & 315) ($1) (295 deg)
// (315 & 360) ($20) (338 deg)

const rotationMain = document.getElementsByClassName('rotation-main')[0];
const rotationOutput = document.getElementsByClassName('rotation-output')[0];
var randomDeg;
var rotationBoolean = false;
function fairPlay(e) {
        var clear = setTimeout(function() {
            rotationBoolean = true;
        },1000)
        document.getElementsByClassName('rotation-0')[0].addEventListener('mouseup', function() {
            clearTimeout(clear)
        })
}
document.getElementsByClassName('rotation-enter')[0].onclick = function () {
    if (inputCoinOut.value >= 5) {
        document.addEventListener('mousedown', fairPlay);
    } else {
        errorMessageFn('Hết tiền')
    }
    if (rotationBoolean) {
            rotationFn(false);
    } else {
            rotationFn(true);
    }
}
function rotationFn(boolean) {
    if (boolean) {
        inputCoinOut.value -= 5;
        randomDeg = Math.random();
        if (randomDeg >= 1) {
            randomDeg *= 1;
        } else if (randomDeg < 1) {
            randomDeg *= 10;
        }
        randomDeg *= 36;
        rotationMain.classList.add('active');
        rotationMain.style.transform = 'transform: rotate(0)';
        rotationMain.style = `--deg: ${randomDeg}deg;`;
        setTimeout(() => {
            rotationMain.classList.remove('active');
            rotationMain.style.transform = `rotate(${randomDeg}deg)`;
            if (randomDeg >= 0 && randomDeg <= 45) {
                rotationOutput.innerText = 'Good Luck';
            } else if (randomDeg > 45 && randomDeg <= 90) {
                rotationOutput.innerText = '10$';
                inputCoinOut.value = Number(inputCoinOut.value) + 10;
            } else if (randomDeg > 90 && randomDeg <= 135) {
                rotationOutput.innerText = '2$';
                inputCoinOut.value = Number(inputCoinOut.value) + 2;
            } else if (randomDeg > 135 && randomDeg <= 180) {
                rotationOutput.innerText = '5$';
                inputCoinOut.value = Number(inputCoinOut.value) + 5;
            } else if (randomDeg > 180 && randomDeg <= 225) {
                rotationOutput.innerText = '3$';
                inputCoinOut.value = Number(inputCoinOut.value) + 3;
            } else if (randomDeg > 225 && randomDeg <= 270) {
                rotationOutput.innerText = 'More Turn';
                inputCoinOut.value = Number(inputCoinOut.value) + 5;
            } else if (randomDeg > 270 && randomDeg <= 315) {
                rotationOutput.innerText = '1$';
                inputCoinOut.value = Number(inputCoinOut.value) + 1;
            } else if (randomDeg > 315 && randomDeg <= 360) {
                rotationOutput.innerText = '20$';
                inputCoinOut.value = Number(inputCoinOut.value) + 20;
            }
            rotationMain.style.transform = `rotate(${randomDeg}deg)`;
        }, 3000)
    } else {
        // inputCoinOut.value -= 5;
        rotationMain.classList.add('active');
        rotationMain.style.transform = 'transform: rotate(0)';
        randomDeg = Math.random();
        if (randomDeg >= 10) {
            randomDeg *= 1;
        } else if (randomDeg < 1) {
            randomDeg *= 100;
        }
        if (randomDeg <= 5) {
            rotationMain.style = `--deg: 20deg;`;
        } else if (randomDeg <= 20) {
            rotationMain.style = `--deg: 60deg;`;
        } else if (randomDeg <= 35) {
            rotationMain.style = `--deg: 158deg;`;
        } else {
            rotationMain.style = `--deg: ${randomDeg}deg;`;
            inputCoinOut.value = (randomDeg)
        }
    }
}

coinRangeBar.style.width = (inputCoinOut.value / 999) * 100 + '%';
var setVolume = false;
const volRangeCircle = document.getElementsByClassName('volume-range-circle')[0];
const volRangeBar = document.getElementsByClassName('volume-range-bar')[0];
const volRange = document.getElementsByClassName('volume-range')[0];
const setVol = document.getElementsByClassName('set-volume');
for (let i of setVol) {
    i.volume = 0.5;
    volRangeBar.style.height = 50 + '%';
}
volRange.addEventListener('mousedown', function (event) {
    setVolume = true;
    volRangeCircle.style.width = '15px';
    volRangeCircle.style.height = '15px';
    unmute();
})

document.addEventListener('mousemove', function (event) {
    const topVol = volRange.getBoundingClientRect().top;
    const volHeight = volRange.getBoundingClientRect().height;
    const volMax = volHeight + topVol;
    const volClientY = event.clientY;
    const volPercent = 100 - (((volClientY - topVol) / volHeight) * 100);
    volRange.style.cursor = 'pointer';
    if (setVolume && volClientY >= topVol && volClientY <= volMax) {
        volRangeBar.style.height = (volPercent * 1) + '%';
        for (let i of setVol) {
            i.volume = volPercent / 100;
        }
    }
})
var clearVol;
var clearVol2;
var hideVol = false;
document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === "v") {
        document.getElementsByClassName('volume')[0].classList.add('active');
        document.getElementsByClassName('main-menu')[0].classList.add('active--');
        function clearVolFn(event) {
            clearTimeout(clearVol);
        }
        document.getElementsByClassName('volume')[0].addEventListener('mousedown', clearVolFn);
        document.addEventListener('mouseup', function (event) {
            document.getElementsByClassName('volume')[0].removeEventListener('mousedown', clearVolFn);
            clearTimeout(clearVol);
            clearVol = setTimeout(function () {
                document.getElementsByClassName('volume')[0].classList.remove('active');
                document.getElementsByClassName('main-menu')[0].classList.remove('active--');
            }, 3000);
        })
        document.getElementsByClassName('volume')[0].addEventListener('mouseout', function () {
            hideVol = true;
        })
        document.addEventListener('mouseup', function () {
            if (hideVol) {
                document.getElementsByClassName('volume')[0].classList.remove('active');
                document.getElementsByClassName('main-menu')[0].classList.remove('active--');
            }
        });
        document.getElementsByClassName('volume')[0].addEventListener('mousemove', function () {
            hideVol = false;
        })
    }
})
var setVol2;
function mute() {
    for (let i of setVol) {
        setVol2 = i.volume;
        i.volume = 0;
    }
    volRangeBar.style.height = '0%';
    document.getElementsByClassName('unmute')[0].style.display = 'block';
    document.getElementsByClassName('mute')[0].style.display = 'none';
}
function unmute() {
    for (let i of setVol) {
        i.volume = setVol2;
    }
    volRangeBar.style.height = setVol2 * 100 + '%';
    document.getElementsByClassName('unmute')[0].style.display = 'none';
    document.getElementsByClassName('mute')[0].style.display = 'block';
}
document.addEventListener('mouseup', function (event) {
    setVolume = false;
    volRange.style.cursor = 'default';
    volRangeCircle.style.width = '10px';
    volRangeCircle.style.height = '10px';
})

coinRangeCircle.addEventListener('mousedown', (event) => {
    coinRangeCircle.style.width = '18px';
    coinRangeCircle.style.height = '18px';
    document.getElementsByClassName('around')[0].style.width = '12px';
    document.getElementsByClassName('around')[0].style.height = '12px';
})
document.getElementsByClassName('coin-form')[0].addEventListener('mouseup', (event) => {
    coinRangeCircle.style.width = '10px';
    coinRangeCircle.style.height = '10px';
    document.getElementsByClassName('around')[0].style.width = '4px';
    document.getElementsByClassName('around')[0].style.height = '4px';
})

for (let i of close) { // close messages
    i.onmouseover = function () {
        i.style.fontSize = '40px'
        i.onclick = function () {
            for (let j of messages) {
                j.classList.remove('active');
            }
        }
        i.onmouseout = function () {
            i.style.fontSize = '35px';
        }
    }
}

let isReady = false;

for (let i of icons) { // effect click

    i.addEventListener('mouseover', function (evt) {
        if (inputCoinOut.value > coinValue) {
            i.style.filter = 'brightness(110%)';
            i.style.boxShadow = '0 0 20px rgba(0,0,0,0.4)';
            isReady = true;
        } else {
            this.addEventListener('click', function () {
                outOfMoney();
            })
        }
    })
    i.addEventListener('mousedown', function (evt) {
        if (isReady) {
            i.style.filter = 'brightness(80%)';
        }
    })
    document.addEventListener('mouseup', function (evt) {
        if (isReady) {
            i.style.filter = 'brightness(100%)';
        }
    })
    i.addEventListener('mouseout', function (evt) {
        i.style.filter = 'brightness(100%)';
        i.style.boxShadow = '';
        isReady = false;
    })
}


for (let i = 0; i < menuItems.length; i++) { // effect click menu
    menuItems[i].addEventListener('mouseover', function (event) {
        if (inputCoinOut.value >= coinValue) {
            menuItems[i].style.filter = 'brightness(120%)';
            menuItems[i].style.boxShadow = '0 2px 20px rgba(0,0,0,0.4)';
            // console.log('hover')
            isReady = true;
        } else {
            this.addEventListener('click', function () {
                outOfMoney();
            })
        }
    })
    menuItems[i].addEventListener('mouseleave', function (event) {
        menuItems[i].style.filter = 'brightness(100%)';
        menuItems[i].style.boxShadow = '';
    })
    menuItems[i].addEventListener('mousedown', function (event) {
        if (isReady) {
            menuItems[i].style.filter = 'brightness(80%)';
            menuItems[i].style.fontSize = '18px';
        }
    });
    document.addEventListener('mouseup', function (event) {
        menuItems[i].style.filter = 'brightness(100%)';
        menuItems[i].style.fontSize = '20px';
        isReady = false;
    });
}



function resetColorandMessages() {
    for (let i of icons) {
        i.classList.remove('active-tooltip-color')
    }
    for (let i of messages) {
        i.classList.remove('active')
    }
    for (let ele of animateText) {
        ele.classList.add('default-color');
        ele.classList.remove('facebook-color', 'twitter-color', 'instagram-color', 'github-color', 'youtube-color', 'lawngreen-color');
        ele.classList.remove('active');

    }
}

var formColor = document.getElementsByClassName('form-color')[0];
for (let evt of animateText) {
    evt.addEventListener('mousedown', (e) => {
        var clear_timeout = setTimeout(() => {
            if (inputCoinOut.value >= coinValue) {
                formColor.classList.add('active');
            }
            document.addEventListener('keydown', function (event) {
                let e = event.code;
                if (e == 'Escape') {
                    formColor.classList.remove('active');
                }
            })
        }, 2000)
        evt.addEventListener('mouseup', (e) => {
            clearTimeout(clear_timeout)
        })
    })
}
var closeFormColor = document.getElementsByClassName('close-form-color')[0];
closeFormColor.onclick = function () {
    formColor.classList.remove('active');
}

closeFormColor.onmouseover = function () {
    closeFormColor.style.filter = 'brightness(120%)';
    closeFormColor.style.boxShadow = '0 2px 20px rgba(0,0,0,0.4)';
}
closeFormColor.onmouseout = function () {
    closeFormColor.style.filter = 'brightness(100%)';
    closeFormColor.style.boxShadow = '';
}
closeFormColor.onmousedown = function () {
    closeFormColor.style.filter = 'brightness(80%)';
    closeFormColor.style.fontSize = '18px';
};
closeFormColor.onmouseup = function () {
    closeFormColor.style.filter = 'brightness(100%)';
    closeFormColor.style.fontSize = '20px';
};

document.getElementsByClassName('animate-btn')[0].onclick = function () {
    for (let evt of animateText) {
        evt.classList.toggle('active');
        document.getElementsByClassName('light')[0].classList.toggle('active')
    }
}
colorRange.onchange = function () {
    switch (colorRange.value) {
        case '-3':
            if (inputCoinOut.value >= coinValue) {
                for (let ele of animateText) {
                    ele.classList.add('facebook-color');
                    ele.classList.remove('twitter-color', 'instagram-color', 'github-color', 'youtube-color', 'lawngreen-color', 'default-color');
                }
                inputCoinOut.value -= coinValue;
            } else { outOfMoney(); colorRange.value = 0 }
            break;
        case '-2':
            if (inputCoinOut.value >= coinValue) {
                for (let ele of animateText) {
                    ele.classList.add('twitter-color');
                    ele.classList.remove('facebook-color', 'instagram-color', 'github-color', 'youtube-color', 'lawngreen-color', 'default-color');
                }
                inputCoinOut.value -= coinValue;
            } else { outOfMoney(); colorRange.value = '0' }
            break;
        case '-1':
            if (inputCoinOut.value >= coinValue) {
                for (let ele of animateText) {
                    ele.classList.add('instagram-color');
                    ele.classList.remove('facebook-color', 'twitter-color', 'github-color', 'youtube-color', 'lawngreen-color', 'default-color');
                }
                inputCoinOut.value -= coinValue;
            } else { outOfMoney(); colorRange.value = 0 }
            break;
        case '0':
            for (let ele of animateText) {
                ele.classList.add('default-color');
                ele.classList.remove('facebook-color', 'twitter-color', 'instagram-color', 'github-color', 'youtube-color', 'lawngreen-color');
            }
            break;
        case '1':
            if (inputCoinOut.value >= coinValue) {
                for (let ele of animateText) {
                    ele.classList.add('github-color');
                    ele.classList.remove('facebook-color', 'instagram-color', 'twitter-color', 'youtube-color', 'lawngreen-color', 'default-color');
                }
                inputCoinOut.value -= coinValue;
            } else { outOfMoney(); colorRange.value = 0 }
            break;
        case '2':
            if (inputCoinOut.value >= coinValue) {
                for (let ele of animateText) {
                    ele.classList.add('youtube-color');
                    ele.classList.remove('facebook-color', 'instagram-color', 'github-color', 'twitter-color', 'lawngreen-color', 'default-color');
                }
                inputCoinOut.value -= coinValue;
            } else { outOfMoney(); colorRange.value = 0 }
            break;
        case '3':
            if (inputCoinOut.value >= coinValue) {
                for (let ele of animateText) {
                    ele.classList.add('lawngreen-color');
                    ele.classList.remove('facebook-color', 'instagram-color', 'github-color', 'youtube-color', 'twitter-color', 'default-color');
                }
                inputCoinOut.value -= coinValue;
            } else { outOfMoney(); colorRange.value = 0 }
            break;
    }
}
document.getElementsByClassName('open-command-form')[0].onclick = function () {
    document.getElementsByClassName('command')[0].classList.add('active');
    document.getElementsByClassName('command-body')[0].classList.add('on');
    command.addEventListener('keydown', function (event) {
        let e = event.key;
        if (e == 'ArrowDown' || e == 'Enter') {
            password.focus()
        }
    });
    password.addEventListener('keydown', function (event) {
        let e = event.key;
        if (e == 'ArrowUp') {
            command.focus()
        } else if (e == 'Enter') {
            activeCommand();
        }
    });
    document.addEventListener('keydown', function (event) {
        let e = event.code;
        if (e == 'Escape') {
            document.getElementsByClassName('command')[0].classList.remove('active');
        }
    })
}

document.getElementsByClassName('close-command-form')[0].onclick = function () {
    document.getElementsByClassName('command')[0].classList.remove('active')
    document.getElementsByClassName('command-body')[0].classList.remove('on')
}

var command = document.getElementsByClassName('command-input')[0];
var password = document.getElementsByClassName('password')[0];
var pass = document.getElementsByClassName('pass');
pass[0].onclick = function () {
    pass[0].style.display = 'none';
    pass[1].style.display = 'block';
    password.type = 'text';
}
pass[1].onclick = function () {
    pass[1].style.display = 'none';
    pass[0].style.display = 'block';
    password.type = 'password';
}

document.getElementsByClassName('clear-command')[0].onclick = function () {
    command.value = ''
}
command.onfocus = function () {
    document.getElementsByClassName('border-command')[0].classList.add('active');
}
password.onfocus = function () {
    document.getElementsByClassName('border-password')[0].classList.add('active');
}
command.onblur = function () {
    document.getElementsByClassName('border-command')[0].classList.remove('active');
    document.getElementsByClassName('border-password')[0].classList.remove('active');
}
password.onblur = function () {
    document.getElementsByClassName('border-command')[0].classList.remove('active');
    document.getElementsByClassName('border-password')[0].classList.remove('active');
}

var clearSwitch;
var clearSwitchCoin;
var checkBoxCommand = document.getElementById('remember-command');
const light = document.getElementsByClassName('light')[0];

function activeCommand(event) {
    if (command.value != '' & password.value != '') {
        if (command.value == '') {
            errorMessageFn('Please fill command!!');
        }
        if (password.value == '') {
            errorMessageFn('Please fill password!!');
        }
        if (password.value == 'admin') {
            switch (command.value) {
                case 'turn on light':
                    if (inputCoinOut.value >= coinValue) {
                        for (let i of icons) {
                            i.classList.add('active-tooltip-color--')
                        };
                        errorMessageFn('Bật đèn');
                        inputCoinOut.value -= coinValue;
                    } else { outOfMoney(); }
                    break;
                case 'turn off light':
                    if (inputCoinOut.value >= coinValue) {
                        for (let i of icons) {
                            i.classList.remove('active-tooltip-color--')
                        };
                        errorMessageFn('Tắt đèn');
                        inputCoinOut.value -= coinValue;
                    } else { outOfMoney(); }
                    break;
                case 'turn on messages':
                    if (inputCoinOut.value >= coinValue) {
                        for (let i of messages) {
                            i.classList.add('messsage-active-all');
                        };
                        errorMessageFn('Bật tất cả thông báo');
                    } else { outOfMoney(); }
                    break;
                case 'turn off messages':
                    if (inputCoinOut.value >= coinValue) {
                        for (let i of messages) {
                            i.classList.remove('messsage-active-all');
                        };
                        errorMessageFn('Tắt tất cả thông báo');
                    } else { outOfMoney(); }
                    break;
                case 'turn on switch':
                    if (inputCoinOut.value >= coinValue) {
                        errorMessageFn('Bật chế độ các nút đổi màu theo thời gian');
                        clearInterval(clearSwitch)
                        var counter = 1;
                        for (let i = 0; i < icons.length; i++) {
                            icons[0].classList.add('active-tooltip-color--');
                            icons[i].classList.remove('active-tooltip-color--');
                        }
                        clearSwitch = setInterval(() => {
                            counter++
                            if (counter > 5) { counter = 1 }
                            switch (counter) {
                                case 1:
                                    for (let i = 0; i < icons.length; i++) {
                                        icons[0].classList.add('active-tooltip-color--');
                                        icons[i].classList.remove('active-tooltip-color--');
                                    }
                                    break;
                                case 2:
                                    for (let i = 0; i < icons.length; i++) {
                                        icons[1].classList.add('active-tooltip-color--');
                                        icons[i].classList.remove('active-tooltip-color--');
                                    }
                                    break;
                                case 3:
                                    for (let i = 0; i < icons.length; i++) {
                                        icons[2].classList.add('active-tooltip-color--');
                                        icons[i].classList.remove('active-tooltip-color--');
                                    }
                                    break;
                                case 4:
                                    for (let i = 0; i < icons.length; i++) {
                                        icons[3].classList.add('active-tooltip-color--');
                                        icons[i].classList.remove('active-tooltip-color--');
                                    }
                                    break;
                                case 5:
                                    for (let i = 0; i < icons.length; i++) {
                                        icons[4].classList.add('active-tooltip-color--');
                                        icons[i].classList.remove('active-tooltip-color--');
                                    }
                                    break;
                            }
                        }, 2000);
                        clearSwitchCoin = setInterval(() => {
                            if (inputCoinOut.value > 0) {
                                inputCoinOut.value -= 1;
                            } else {
                                clearInterval(clearSwitch);
                                clearInterval(clearSwitchCoin);
                                for (let i of icons) {
                                    i.classList.remove('active-tooltip-color--');
                                };
                                errorMessageFn('Hết tiền!!')
                            }
                        }, 5000)
                    } else { outOfMoney(); clearInterval(clearSwitchCoin) }
                    break;
                case 'turn off switch':
                    if (inputCoinOut.value >= coinValue) {
                        clearInterval(clearSwitch);
                        clearInterval(clearSwitchCoin);
                        for (let i of icons) {
                            i.classList.remove('active-tooltip-color--');
                        };
                        errorMessageFn('Tắt chế độ các nút đổi màu theo thời gian');
                    } else { outOfMoney(); }
                    break;
                case 'show all command':
                    if (inputCoinOut.value >= coinValue) {
                        document.getElementsByClassName('main-command')[0].classList.add('active');
                        document.getElementsByClassName('back-to-normal-command')[0].onclick = function () {
                            document.getElementsByClassName('main-command')[0].classList.remove('active');
                            command.value = '';
                        }
                        document.getElementsByClassName('close-show-all-command')[0].onclick = function () {
                            document.getElementsByClassName('command')[0].classList.remove('active');
                        }
                        errorMessageFn('Hiện tất cả các lệnh')
                    } else { outOfMoney(); }
                    break;
                case 'turn on all':
                    if (inputCoinOut.value >= coinValue) {
                        for (let i = 0; i < 5; i++) {
                            icons[i].classList.add('active-tooltip-color--');
                            messages[i].classList.add('messsage-active-all')
                        };
                        errorMessageFn('Kích hoạt các lệnh')
                    }
                    break;
                case 'turn off all':
                    if (inputCoinOut.value >= coinValue) {
                        for (let i = 0; i < 5; i++) {
                            icons[i].classList.remove('active-tooltip-color--');
                            messages[i].classList.remove('messsage-active-all')
                        };
                        errorMessageFn('Hủy kích hoạt các lệnh')
                    }
                    break;
                default: errorMessageFn('Incorrect command or password!!')
            }
        } else {
            password.value = ''
            errorMessageFn('Incorrect command or password!!')
        }
    } else {
        errorMessageFn('Please fill all field')
    }
}

function turnOnLight() {
    command.value = 'turn on light'
    password.value = 'admin';
    activeCommand();
}

function turnOffLight() {
    command.value = 'turn off light'
    password.value = 'admin';
    activeCommand();
}

function turnOnSwitch() {
    command.value = 'turn on switch'
    password.value = 'admin';
    activeCommand();
}

function turnOffSwitch() {
    command.value = 'turn off switch'
    password.value = 'admin';
    activeCommand();
}

function turnOnMessages() {
    command.value = 'turn on messages'
    password.value = 'admin';
    activeCommand();
}

function turnOffMessages() {
    command.value = 'turn off messages'
    password.value = 'admin';
    activeCommand();
}

function turnOnAll() {
    command.value = 'turn on all'
    password.value = 'admin';
    activeCommand();
}

function turnOffAll() {
    command.value = 'turn off all'
    password.value = 'admin';
    activeCommand();
}


document.getElementsByClassName('close-coin-form')[0].onclick = function () {
    ;
    document.getElementsByClassName('coin')[0].classList.remove('active')
}

const coinRange = document.getElementsByClassName('coin-range')[0];

inputCoinIn.onfocus = function () {
    document.getElementsByClassName('placeholder-input-coin')[0].classList.add('active');
}
inputCoinIn.onblur = function () {
    if (inputCoinIn.value == '' || inputCoinIn.value == '0') {
        document.getElementsByClassName('placeholder-input-coin')[0].classList.remove('active');
        inputCoinIn.value = ''
    }
}





function fontSize() {
    if (inputCoinOut.value >= 100) {
        inputCoinOut.style.fontSize = '20px';
    } else {
        inputCoinOut.style.fontSize = '23px'
    }
}

icons[0].onclick = function () {
    if (inputCoinOut.value >= coinValue) {
        for (let i = 0; i < messages.length; i++) {
            messages[0].classList.add('active');
            messages[i].classList.remove('active');
        }
        inputCoinOut.value -= coinValue;
    }
};

icons[1].onclick = function () {
    if (inputCoinOut.value >= coinValue) {
        for (let i = 0; i < messages.length; i++) {
            messages[1].classList.add('active');
            messages[i].classList.remove('active');
        }
        inputCoinOut.value -= coinValue;
    }
};

icons[2].onclick = function () {
    if (inputCoinOut.value >= coinValue) {
        for (let i = 0; i < messages.length; i++) {
            messages[2].classList.add('active');
            messages[i].classList.remove('active');
        }
        inputCoinOut.value -= coinValue;
    }
};

icons[3].onclick = function () {
    if (inputCoinOut.value >= coinValue) {
        for (let i = 0; i < messages.length; i++) {
            messages[3].classList.add('active');
            messages[i].classList.remove('active');
        }
        inputCoinOut.value -= coinValue;
    }
};

icons[4].onclick = function () {
    if (inputCoinOut.value >= coinValue) {
        for (let i = 0; i < messages.length; i++) {
            messages[4].classList.add('active');
            messages[i].classList.remove('active');
        }
        inputCoinOut.value -= coinValue;
    }
};

for (let i = 0; i < icons.length; i++) { // btn tooltip hover
    icons[i].onmouseover = function () {
        if (inputCoinOut.value >= coinValue) {
            icons[i].classList.add('active-tooltip-color');
        }
    }
    icons[i].onmouseout = function () {
        icons[i].classList.remove('active-tooltip-color');
    }
    icons[i].onmousedown = function () {

    }
}

menuItems[0].onclick = function () {
    if (inputCoinOut.value >= coinValue) {
        for (let i = 0; i < menuItems.length - 1; i++) {
            icons[0].classList.add('active-tooltip-color');
            icons[i].classList.remove('active-tooltip-color');
            messages[0].classList.add('active');
            messages[i].classList.remove('active');
        }
        inputCoinOut.value -= coinValue;
    }
};

menuItems[1].onclick = function () {
    if (inputCoinOut.value >= coinValue) {
        for (let i = 0; i < menuItems.length - 1; i++) {
            icons[1].classList.add('active-tooltip-color');
            icons[i].classList.remove('active-tooltip-color');
            messages[1].classList.add('active');
            messages[i].classList.remove('active');
        }
        inputCoinOut.value -= coinValue;
    }
};

menuItems[2].onclick = function () {
    if (inputCoinOut.value >= coinValue) {
        for (let i = 0; i < menuItems.length - 1; i++) {
            icons[2].classList.add('active-tooltip-color');
            icons[i].classList.remove('active-tooltip-color');
            messages[2].classList.add('active');
            messages[i].classList.remove('active');
        }
        inputCoinOut.value -= coinValue;
    }
};

menuItems[3].onclick = function () {
    if (inputCoinOut.value >= coinValue) {
        for (let i = 0; i < menuItems.length - 1; i++) {
            icons[3].classList.add('active-tooltip-color');
            icons[i].classList.remove('active-tooltip-color');
            messages[3].classList.add('active');
            messages[i].classList.remove('active');
        }
        inputCoinOut.value -= coinValue;
    }
};

menuItems[4].onclick = function () {
    if (inputCoinOut.value >= coinValue) {
        for (let i = 0; i < menuItems.length - 1; i++) {
            icons[i].classList.remove('active-tooltip-color');
            icons[4].classList.add('active-tooltip-color');
            messages[i].classList.remove('active');
            messages[4].classList.add('active');
        }
        inputCoinOut.value -= coinValue;
    } else {
        // outOfMoney();
    }

};

document.getElementsByClassName('main-menu__open-btn')[0].onclick = function () {
    document.getElementsByClassName('main-menu')[0].classList.toggle('active');
    for (let i of document.getElementsByClassName('menu-item-icon')) {
        i.classList.remove('active');
    }
    for (let i of document.getElementsByClassName('bars')) {
        i.classList.remove('active')
    }
}
document.getElementsByClassName('main-menu__dashboard-menu-1')[0].onclick = function () {
    for (let i of document.getElementsByClassName('menu-item-icon')) {
        i.classList.toggle('active');
    }
    for (let i of document.getElementsByClassName('bars')) {
        i.classList.toggle('active')
    }
}
// var zodiac;
const zodiacMonth = document.getElementById('month');
const zodiacDate = document.getElementById('date');
const zodiacDates = document.getElementsByClassName('date');
const zodiacSubmit = document.getElementsByClassName('zodiac__form-body-submit')[0];
const zodiacOption = document.getElementsByClassName('zodiac__form-body-choosedate-option')[0];
const zodiacItem = document.getElementsByClassName('zodiac__form-body-choosedate-option-item');
const zodiacMonthOutput = document.getElementsByClassName('zodiac__form-body-choosedate-month-text')[0];
const zodiacDateOutput = document.getElementById('zodiac__form-body-choosedate-date-text');
const zodiacHeadingDisplay = document.getElementsByClassName('zodiac__form-display-text-heading')[0];
const zodiacDescDisplay = document.getElementsByClassName('zodiac__form-display-text-desc')[0];
const zodiacImgDisplay = document.getElementsByClassName('zodiac__display-img')[0];
const zodiacIcon = document.getElementsByClassName('zodiac__form-body-choosedate-month-icon');
var zodiacMonthBoolean = false;
var zodiacDateBoolean = false;

document.getElementsByClassName('main-menu__dashboard-menu2')[0].addEventListener('click', function () {
    document.getElementsByClassName('zodiac')[0].classList.add('active');
})
document.getElementsByClassName('zodiac__form-body-close')[0].addEventListener('click', function () {
    document.getElementsByClassName('zodiac')[0].classList.remove('active');
})

document.getElementById('left').addEventListener('mouseover', function () {

})
document.getElementById('left').addEventListener('mouseout', function () {
})
zodiacMonth.addEventListener('click', function () {
    zodiacSubmit.style.zIndex = '-1';
    zodiacOption.classList.toggle('active');
    zodiacIcon[0].classList.toggle('active');
    for (let i of zodiacItem) {
        i.onclick = function () {
            switch (i.value) {
                case 1:
                    zodiacMonthOutput.innerText = 'January';
                    zodiacOption.classList.toggle('active');
                    zodiacIcon[0].classList.toggle('active');
                    zodiacSubmit.style.zIndex = '0';
                    break;
                case 2:
                    zodiacMonthOutput.innerText = 'February';
                    zodiacOption.classList.toggle('active');
                    zodiacIcon[0].classList.toggle('active');
                    zodiacSubmit.style.zIndex = '0';
                    break;
                case 3:
                    zodiacMonthOutput.innerText = 'March';
                    zodiacOption.classList.toggle('active');
                    zodiacIcon[0].classList.toggle('active');
                    zodiacSubmit.style.zIndex = '0';
                    break;
                case 4:
                    zodiacMonthOutput.innerText = 'April';
                    zodiacOption.classList.toggle('active');
                    zodiacIcon[0].classList.toggle('active');
                    zodiacSubmit.style.zIndex = '0';
                    break;
                case 5:
                    zodiacMonthOutput.innerText = 'May';
                    zodiacOption.classList.toggle('active');
                    zodiacIcon[0].classList.toggle('active');
                    zodiacSubmit.style.zIndex = '0';
                    break;
                case 6:
                    zodiacMonthOutput.innerText = 'June';
                    zodiacOption.classList.toggle('active');
                    zodiacIcon[0].classList.toggle('active');
                    zodiacSubmit.style.zIndex = '0';
                    break;
                case 7:
                    zodiacMonthOutput.innerText = 'July';
                    zodiacOption.classList.toggle('active');
                    zodiacIcon[0].classList.toggle('active');
                    zodiacSubmit.style.zIndex = '0';
                    break;
                case 8:
                    zodiacMonthOutput.innerText = 'August';
                    zodiacOption.classList.toggle('active');
                    zodiacIcon[0].classList.toggle('active');
                    zodiacSubmit.style.zIndex = '0';
                    break;
                case 9:
                    zodiacMonthOutput.innerText = 'September';
                    zodiacOption.classList.toggle('active');
                    zodiacIcon[0].classList.toggle('active');
                    zodiacSubmit.style.zIndex = '0';
                    break;
                case 10:
                    zodiacMonthOutput.innerText = 'October';
                    zodiacOption.classList.toggle('active');
                    zodiacIcon[0].classList.toggle('active');
                    zodiacSubmit.style.zIndex = '0';
                    break;
                case 11:
                    zodiacMonthOutput.innerText = 'November';
                    zodiacOption.classList.toggle('active');
                    zodiacIcon[0].classList.toggle('active');
                    zodiacSubmit.style.zIndex = '0';
                    break;
                case 12:
                    zodiacMonthOutput.innerText = 'December';
                    zodiacOption.classList.toggle('active');
                    zodiacIcon[0].classList.toggle('active');
                    zodiacSubmit.style.zIndex = '0';
                    break;
            }
        }
    }
})
zodiacMonth.addEventListener('mouseover', function () {
    zodiacMonthBoolean = false;
})
zodiacMonth.addEventListener('mouseout', function () {
    zodiacMonthBoolean = true;
    document.addEventListener('click', function () {
        if (zodiacMonthBoolean) {
            zodiacOption.classList.remove('active');
            zodiacIcon[0].classList.remove('active');
            zodiacSubmit.style.zIndex = '0';
        }
    })

})

zodiacDate.addEventListener('click', function () {
    document.querySelector('table').classList.toggle('active');
    zodiacIcon[1].classList.toggle('active');
    for (let i of zodiacDates) {
        i.onclick = function () {
            zodiacDateOutput.innerText = this.value;
            document.querySelector('table').classList.toggle('active');
            zodiacIcon[1].classList.toggle('active');
        }
    }
})
zodiacDate.addEventListener('mouseover', function () {
    zodiacDateBoolean = false;
})
zodiacDate.addEventListener('mouseout', function () {
    zodiacDateBoolean = true;
    document.addEventListener('click', function () {
        if (zodiacDateBoolean) {
            document.querySelector('table').classList.remove('active');
            zodiacIcon[1].classList.remove('active');
        }
    })

})

zodiacSubmit.addEventListener('click', function () {
    if (zodiacMonthOutput.innerText != 'Month' && zodiacDateOutput.innerText != 'Date') {
        document.getElementsByClassName('zodiac__form-display')[0].classList.add('active');
        document.getElementsByClassName('zodiac__form-display-close')[0].onclick = function () {
            document.getElementsByClassName('zodiac__form-display')[0].classList.remove('active');
        }
        if (zodiacMonthOutput.innerText == 'January' && zodiacDateOutput.innerText <= 19) {
            zodiacFn('capricorn', 'Capricorn', '(Cung Ma Kết - 23/12 - 19/01)');
        } else if (zodiacMonthOutput.innerText == 'December' && zodiacDateOutput.innerText >= 23) {
            zodiacFn('capricorn', 'Capricorn', '(Cung Ma Kết - 23/12 - 19/01)');
        }

        if (zodiacMonthOutput.innerText == 'February' && zodiacDateOutput.innerText <= 19) {
            zodiacFn('aquarius', 'Aquarius', '(Cung Bảo Bình - 20/01 - 19/02)');
        } else if (zodiacMonthOutput.innerText == 'January' && zodiacDateOutput.innerText >= 20) {
            zodiacFn('aquarius', 'Aquarius', '(Cung Bảo Bình - 20/01 - 19/02)');
        }

        if (zodiacMonthOutput.innerText == 'February' && zodiacDateOutput.innerText >= 20) {
            zodiacFn('pisces', 'Pisces', '(Cung Song Ngư - 20/02 - 21/03)');
        } else if (zodiacMonthOutput.innerText == 'March' && zodiacDateOutput.innerText <= 21) {
            zodiacFn('pisces', 'Pisces', '(Cung Song Ngư - 20/02 - 21/03)');
        }

        if (zodiacMonthOutput.innerText == 'March' && zodiacDateOutput.innerText >= 22) {
            zodiacFn('aries', 'Aries', '(Cung Bạch Dương - 22/03 - 20/04)');
        } else if (zodiacMonthOutput.innerText == 'April' && zodiacDateOutput.innerText <= 20) {
            zodiacFn('aries', 'Aries', '(Cung Bạch Dương - 22/03 - 20/04)');
        }

        if (zodiacMonthOutput.innerText == 'April' && zodiacDateOutput.innerText >= 21) {
            zodiacFn('taurus', 'Taurus', '(Cung Kim Ngưu - 21/04 - 21/05)');
        } else if (zodiacMonthOutput.innerText == 'May' && zodiacDateOutput.innerText <= 21) {
            zodiacFn('taurus', 'Taurus', '(Cung Kim Ngưu - 21/03 - 21/05)');
        }

        if (zodiacMonthOutput.innerText == 'May' && zodiacDateOutput.innerText >= 22) {
            zodiacFn('gemini', 'Gemini', '(Cung Song Tử - 22/05 - 22/06)');
        } else if (zodiacMonthOutput.innerText == 'June' && zodiacDateOutput.innerText <= 22) {
            zodiacFn('gemini', 'Gemini', '(Cung Song Tử - 22/05 - 22/06)');
        }

        if (zodiacMonthOutput.innerText == 'June' && zodiacDateOutput.innerText >= 23) {
            zodiacFn('cancer', 'Cancer', '(Cung Cự Giải - 23/06 - 23/07)');
        } else if (zodiacMonthOutput.innerText == 'July' && zodiacDateOutput.innerText <= 23) {
            zodiacFn('cancer', 'Cancer', '(Cung Cự Giải - 23/06 - 23/07)');
        }

        if (zodiacMonthOutput.innerText == 'July' && zodiacDateOutput.innerText >= 24) {
            zodiacFn('leo', 'Leo', '(Cung Sư Tử - 24/07 - 23/08)');
        } else if (zodiacMonthOutput.innerText == 'August' && zodiacDateOutput.innerText <= 23) {
            zodiacFn('leo', 'Leo', '(Cung Sư Tử - 24/07 - 23/08)');
        }

        if (zodiacMonthOutput.innerText == 'August' && zodiacDateOutput.innerText >= 24) {
            zodiacFn('virgo', 'Virgo', '(Cung Xử Nữ - 24/08 - 23/09)');
        } else if (zodiacMonthOutput.innerText == 'September' && zodiacDateOutput.innerText <= 23) {
            zodiacFn('virgo', 'Virgo', '(Cung Xử Nữ - 24/08 - 23/09)');
        }

        if (zodiacMonthOutput.innerText == 'September' && zodiacDateOutput.innerText >= 24) {
            zodiacFn('libra', 'Libra', '(Cung Thiên Bình - 24/09 - 23/10)');
        } else if (zodiacMonthOutput.innerText == 'October' && zodiacDateOutput.innerText <= 23) {
            zodiacFn('libra', 'Libra', '(Cung Thiên Bình - 24/09 - 23/10)');
        }

        if (zodiacMonthOutput.innerText == 'October' && zodiacDateOutput.innerText >= 24) {
            zodiacFn('scorpio', 'Scorpio', '(Cung Bọ Cạp - 24/10 - 22/11)');
        } else if (zodiacMonthOutput.innerText == 'November' && zodiacDateOutput.innerText <= 22) {
            zodiacFn('scorpio', 'Scorpio', '(Cung Bọ Cạp - 24/10 - 22/11)');
        }

        if (zodiacMonthOutput.innerText == 'November' && zodiacDateOutput.innerText >= 23) {
            zodiacFn('sagittarius', 'Sagitttarius', '(Cung Nhân Mã - 23/11 - 22/12)');
        } else if (zodiacMonthOutput.innerText == 'December' && zodiacDateOutput.innerText <= 22) {
            zodiacFn('sagittarius', 'Sagitttarius', '(Cung Nhân Mã - 23/11 - 22/12)');
        }
    } else {
        errorMessageFn('Vui lòng chọn ngày và tháng!!')
    }

    function zodiacFn(zodiac, heading, desc) {
        zodiacImgDisplay.style.background = `url(./assets/images/${zodiac}.jpg)`;
        zodiacImgDisplay.style.backgroundRepeat = 'no-repeat';
        zodiacImgDisplay.style.backgroundPosition = '-35px 0';
        zodiacImgDisplay.style.backgroundSize = 'cover';
        zodiacImgDisplay.style.width = '140px';
        zodiacImgDisplay.style.height = '140px';
        zodiacHeadingDisplay.innerText = heading;
        zodiacDescDisplay.innerText = desc;
    }
})

function outOfMoney(event) {
    if (inputCoinOut.value < coinValue) {
        console.log(this)
        clearInterval(clearOutofMoney);
        document.getElementsByClassName('error-sound')[0].play();
        inputCoinOut.style.color = 'red';
        var count = 0;
        var clearOutofMoney = setInterval(() => {
            count++;
            setTimeout(() => {
                inputCoinOut.style.color = '#000';
                setTimeout(() => {
                    inputCoinOut.style.color = 'red';
                    setTimeout(() => {
                        inputCoinOut.style.color = '#000';
                        setTimeout(() => {
                            inputCoinOut.style.color = '#fff';
                        }, 70)
                    }, 70)
                }, 70)
            }, 70)
            if (count === 3) {
                clearInterval(clearOutofMoney);
            }
        }, 210)
    }
}

