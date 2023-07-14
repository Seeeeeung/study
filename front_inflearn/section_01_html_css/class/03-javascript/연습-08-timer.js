let time = 10;
undefined
setInterval(function() {
    if (time >= 0) {
        
    console.log(time)
    time = time - 1
    }
}, 1000)

// VM817:4 10
// VM817:4 9
// VM817:4 8
// VM817:4 7
// VM817:4 6
// VM817:4 5
// VM817:4 4
// VM817:4 3
// VM817:4 2
// VM817:4 1
// VM817:4 0


//  타이머
// let time = 180
// setInterval(function() {
// 	if (time >=0) {
// 			let min = Math.floor( time / 60 )
// 			let sec = String(time % 60).padStart(2,"0")
// 			console.log(min + " : " + sec)
// 			time = time - 1
// 	}
// },1000)
// 3