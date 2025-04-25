def on_pin_pressed_p0():
    radio.send_string("hello")
input.on_pin_pressed(TouchPin.P0, on_pin_pressed_p0)

def on_gesture_screen_down():
    if game_status == 1:
        music.play(music.builtin_playable_sound_effect(soundExpression.yawn),
            music.PlaybackMode.UNTIL_DONE)
        basic.clear_screen()







        
        while input.is_gesture(Gesture.SCREEN_DOWN):
            basic.pause(100)
        music.play(music.builtin_playable_sound_effect(soundExpression.spring),
            music.PlaybackMode.UNTIL_DONE)
input.on_gesture(Gesture.SCREEN_DOWN, on_gesture_screen_down)

def on_button_pressed_b():
    if game_status == 1:
        for index in range(4):
            basic.show_leds("""
                . . . . .
                . # . # .
                # # # # #
                # . . . #
                # # # # #
                """)
            basic.show_leds("""
                . . . . .
                . # . # .
                . . . . .
                # # # # #
                . . . . .
                """)
        basic.clear_screen()
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_gesture_shake():
    if game_status == 1:
        basic.show_leds("""
            . . . . .
            . # . # .
            . . # . .
            . # . # .
            . . # . .
            """)
        basic.pause(1000)
        basic.clear_screen()
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

exercise = 0
obstacles_x = 0
game_status_2 = 0
hedgehog_x = 0
game_status = 0
radio.set_group(1)
game_status = 0

def on_forever():
    global game_status
    if game_status == 0:
        basic.show_leds("""
            . . . . .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            """)
        basic.pause(500)
        basic.clear_screen()
        basic.pause(500)
        music.play(music.builtin_playable_sound_effect(soundExpression.hello),
            music.PlaybackMode.UNTIL_DONE)
        basic.show_string("Hello!")
        game_status = 1
basic.forever(on_forever)

def on_forever2():
    global hedgehog_x, game_status_2, game_status
    if game_status == 2:
        basic.pause(500)
        hedgehog_x = 2
        game_status_2 = 1
        game_status = 3
basic.forever(on_forever2)

def on_forever3():
    global obstacles_x, game_status_2, game_status, exercise
    if game_status_2 == 1:
        basic.show_leds("""
            . . # # .
            . # . . #
            . . . # .
            . # . . #
            . . # # .
            """)
        music.play(music.string_playable("D - - - - - - - ", 500),
            music.PlaybackMode.UNTIL_DONE)
        basic.pause(500)
        basic.show_leds("""
            . # # # .
            . . . . #
            . . # # .
            . # . . .
            . # # # #
            """)
        music.play(music.string_playable("D - - - - - - - ", 500),
            music.PlaybackMode.UNTIL_DONE)
        basic.pause(500)
        basic.show_leds("""
            . . # . .
            . # # . .
            . . # . .
            . . # . .
            . # # # .
            """)
        music.play(music.string_playable("D - - - - - - - ", 500),
            music.PlaybackMode.UNTIL_DONE)
        basic.pause(500)
        basic.clear_screen()
        music.play(music.string_playable("B - - - - - - - ", 500),
            music.PlaybackMode.UNTIL_DONE)
        for index2 in range(5):
            if game_status_2 == 1:
                obstacles_x = randint(0, 4)
                for y in range(5):
                    for x in range(5):
                        if x != obstacles_x:
                            led.plot(x, y)
                    if y == 4 and obstacles_x != hedgehog_x:
                        game_status_2 = 2
                        basic.clear_screen()
                        led.unplot(hedgehog_x, 4)
                        basic.show_leds("""
                            . . . . .
                            . # . # .
                            . . . . .
                            . # # # .
                            # . . . #
                            """)
                        basic.pause(200)
                        basic.clear_screen()
                    basic.pause(500)
                    for x2 in range(5):
                        led.unplot(x2, y)
        if game_status_2 == 1:
            game_status_2 = 3
        if game_status_2 == 3:
            led.plot(hedgehog_x, 4)
            basic.pause(300)
            led.plot(0, 0)
            led.plot(2, 0)
            led.plot(4, 0)
            basic.pause(300)
            basic.clear_screen()
            led.plot(hedgehog_x, 4)
            led.plot(0, 1)
            led.plot(2, 1)
            led.plot(4, 1)
            led.plot(1, 0)
            led.plot(3, 0)
            basic.pause(300)
            basic.clear_screen()
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
            basic.clear_screen()
            basic.show_leds("""
                . . . . .
                . # . # .
                . . . . .
                # . . . #
                . # # # .
                """)
            basic.pause(200)
            basic.clear_screen()
        game_status_2 = 0
        game_status = 1
        exercise += 3
basic.forever(on_forever3)

def on_forever4():
    global game_status
    if game_status == 1:
        if input.button_is_pressed(Button.A):
            game_status = 2
basic.forever(on_forever4)

def on_forever5():
    global hedgehog_x
    if game_status_2 == 1:
        if hedgehog_x < 4:
            if input.button_is_pressed(Button.B):
                led.unplot(hedgehog_x, 4)
                hedgehog_x += 1
                basic.pause(200)
basic.forever(on_forever5)

def on_forever6():
    global hedgehog_x
    if game_status_2 == 1:
        if hedgehog_x > 0:
            if input.button_is_pressed(Button.A):
                led.unplot(hedgehog_x, 4)
                hedgehog_x += -1
                basic.pause(200)
basic.forever(on_forever6)

def on_forever7():
    if game_status_2 == 1:
        led.plot(hedgehog_x, 4)
basic.forever(on_forever7)
