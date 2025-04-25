input.onPinPressed(TouchPin.P0, function on_pin_pressed_p0() {
    radio.sendString("hello")
})
input.onGesture(Gesture.ScreenDown, function on_gesture_screen_down() {
    if (game_status == 1) {
        music.play(music.builtinPlayableSoundEffect(soundExpression.yawn), music.PlaybackMode.UntilDone)
        basic.clearScreen()
        while (input.isGesture(Gesture.ScreenDown)) {
            basic.pause(100)
        }
        music.play(music.builtinPlayableSoundEffect(soundExpression.spring), music.PlaybackMode.UntilDone)
    }
    
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    if (game_status == 1) {
        for (let index = 0; index < 4; index++) {
            basic.showLeds(`
                . . . . .
                . # . # .
                # # # # #
                # . . . #
                # # # # #
                `)
            basic.showLeds(`
                . . . . .
                . # . # .
                . . . . .
                # # # # #
                . . . . .
                `)
        }
        basic.clearScreen()
    }
    
})
input.onGesture(Gesture.Shake, function on_gesture_shake() {
    if (game_status == 1) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . # . .
            . # . # .
            . . # . .
            `)
        basic.pause(1000)
        basic.clearScreen()
    }
    
})
let exercise = 0
let obstacles_x = 0
let game_status_2 = 0
let hedgehog_x = 0
let game_status = 0
radio.setGroup(1)
game_status = 0
basic.forever(function on_forever() {
    
    if (game_status == 0) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            `)
        basic.pause(500)
        basic.clearScreen()
        basic.pause(500)
        music.play(music.builtinPlayableSoundEffect(soundExpression.hello), music.PlaybackMode.UntilDone)
        basic.showString("Hello!")
        game_status = 1
    }
    
})
basic.forever(function on_forever2() {
    
    if (game_status == 2) {
        basic.pause(500)
        hedgehog_x = 2
        game_status_2 = 1
        game_status = 3
    }
    
})
basic.forever(function on_forever3() {
    
    if (game_status_2 == 1) {
        basic.showLeds(`
            . . # # .
            . # . . #
            . . . # .
            . # . . #
            . . # # .
            `)
        music.play(music.stringPlayable("D - - - - - - - ", 500), music.PlaybackMode.UntilDone)
        basic.pause(500)
        basic.showLeds(`
            . # # # .
            . . . . #
            . . # # .
            . # . . .
            . # # # #
            `)
        music.play(music.stringPlayable("D - - - - - - - ", 500), music.PlaybackMode.UntilDone)
        basic.pause(500)
        basic.showLeds(`
            . . # . .
            . # # . .
            . . # . .
            . . # . .
            . # # # .
            `)
        music.play(music.stringPlayable("D - - - - - - - ", 500), music.PlaybackMode.UntilDone)
        basic.pause(500)
        basic.clearScreen()
        music.play(music.stringPlayable("B - - - - - - - ", 500), music.PlaybackMode.UntilDone)
        for (let index2 = 0; index2 < 5; index2++) {
            if (game_status_2 == 1) {
                obstacles_x = randint(0, 4)
                for (let y = 0; y < 5; y++) {
                    for (let x = 0; x < 5; x++) {
                        if (x != obstacles_x) {
                            led.plot(x, y)
                        }
                        
                    }
                    if (y == 4 && obstacles_x != hedgehog_x) {
                        game_status_2 = 2
                        basic.clearScreen()
                        led.unplot(hedgehog_x, 4)
                        basic.showLeds(`
                            . . . . .
                            . # . # .
                            . . . . .
                            . # # # .
                            # . . . #
                            `)
                        basic.pause(200)
                        basic.clearScreen()
                    }
                    
                    basic.pause(500)
                    for (let x2 = 0; x2 < 5; x2++) {
                        led.unplot(x2, y)
                    }
                }
            }
            
        }
        if (game_status_2 == 1) {
            game_status_2 = 3
        }
        
        if (game_status_2 == 3) {
            led.plot(hedgehog_x, 4)
            basic.pause(300)
            led.plot(0, 0)
            led.plot(2, 0)
            led.plot(4, 0)
            basic.pause(300)
            basic.clearScreen()
            led.plot(hedgehog_x, 4)
            led.plot(0, 1)
            led.plot(2, 1)
            led.plot(4, 1)
            led.plot(1, 0)
            led.plot(3, 0)
            basic.pause(300)
            basic.clearScreen()
            led.plot(hedgehog_x, 4)
            led.plot(0, 0)
            led.plot(2, 0)
            led.plot(4, 0)
            led.plot(1, 1)
            led.plot(3, 1)
            led.plot(0, 2)
            led.plot(2, 2)
            led.plot(4, 2)
            basic.pause(1000)
            basic.clearScreen()
            basic.showLeds(`
                . . . . .
                . # . # .
                . . . . .
                # . . . #
                . # # # .
                `)
            basic.pause(200)
            basic.clearScreen()
        }
        
        game_status_2 = 0
        game_status = 1
        exercise += 3
    }
    
})
basic.forever(function on_forever4() {
    
    if (game_status == 1) {
        if (input.buttonIsPressed(Button.A)) {
            game_status = 2
        }
        
    }
    
})
basic.forever(function on_forever5() {
    
    if (game_status_2 == 1) {
        if (hedgehog_x < 4) {
            if (input.buttonIsPressed(Button.B)) {
                led.unplot(hedgehog_x, 4)
                hedgehog_x += 1
                basic.pause(200)
            }
            
        }
        
    }
    
})
basic.forever(function on_forever6() {
    
    if (game_status_2 == 1) {
        if (hedgehog_x > 0) {
            if (input.buttonIsPressed(Button.A)) {
                led.unplot(hedgehog_x, 4)
                hedgehog_x += -1
                basic.pause(200)
            }
            
        }
        
    }
    
})
basic.forever(function on_forever7() {
    if (game_status_2 == 1) {
        led.plot(hedgehog_x, 4)
    }
    
})
