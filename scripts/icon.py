# Replace the apple watch icon stuff
from call import call
import os
import json

# Icons
icon_main = 'assets/icon.png'
icon_alpha = 'assets/icon_alpha.png'

# Generate icon function
def generate_icon(icon_in, icon_out, size):
    call('convert {} -resize {}x{} {}'.format(icon_in, size, size, icon_out))

# Android
android_path = 'android/app/src/main/res'
android_icons = {
    'mipmap-ldpi': 36,
    'mipmap-mdpi': 48,
    'mipmap-hdpi': 72,
    'mipmap-xhdpi': 96,
    'mipmap-xxhdpi': 144,
    'mipmap-xxxhdpi': 192
}
def generate_android():
    for icon_name in android_icons.keys():
        size = android_icons[icon_name]
        output = '{}/{}/ic_launcher.png'.format(android_path, icon_name)
        generate_icon(icon_main, output, size)

# iOS
# Main app
ios_path = 'ios/WifiUC/Images.xcassets/AppIcon.appiconset'
ios_icons = {
    'iphone': {
        'icon-20@2x': 20*2,
        'icon-20@3x': 20*3,
        'icon-29@1x': 29,
        'icon-29@2x': 29*2,
        'icon-29@3x': 29*3,
        'icon-40@2x': 40*2,
        'icon-40@3x': 40*3,
        'icon-57@1x': 57,
        'icon-57@2x': 57*2,
        'icon-60@2x': 60*2,
        'icon-60@3x': 60*3
    },
    'ipad': {
        'icon-20@1x': 20,
        'icon-20@2x': 20*2,
        'icon-29@1x': 29,
        'icon-29@2x': 29*2,
        'icon-40@1x': 40,
        'icon-40@2x': 40*2,
        'icon-50@1x': 50,
        'icon-50@2x': 50*2,
        'icon-72@1x': 72,
        'icon-72@2x': 72*2,
        'icon-76@1x': 76,
        'icon-76@2x': 76*2,
        'icon-83.5@2x': 83.5*2
    }
}
def generate_ios():
    for device in ios_icons.keys():
        for icon_name in ios_icons[device].keys():
            size = ios_icons[device][icon_name]
            output = '{}/{}.png'.format(ios_path, icon_name)
            generate_icon(icon_main, output, size)

def generate_ios_content():
    ios_content = {
        'images': [],
        'info': { 'version': 1, 'author': 'xcode' }
    }
    for device in ios_icons.keys():
        for icon_name in ios_icons[device].keys():
            size = icon_name.split('@')[0].split('-')[1]
            scale = icon_name.split('@')[1]
            data = {
                'size': '{}x{}'.format(size, size),
                'idiom': device,
                'filename': icon_name + '.png',
                'scale': scale
            }
            ios_content['images'].append(data)
    with open('{}/Contents.json'.format(ios_path), 'w') as contents:
        json.dump(ios_content, contents)

# Watch
ios_watch_path = 'ios/Watch/Assets.xcassets/AppIcon.appiconset'
ios_watch_icons = {
    'notificationCenter': {
        '38mm@2x': 24*2,
        '42mm@2x': 27.5*2
    },
    'companionSettings': {
        '@2x': 29*2,
        '@3x': 29*3
    },
    'appLauncher': {
        '38mm@2x': 40*2
    },
    'quickLook': {
        '38mm@2x': 86*2,
        '42mm@2x': 98*2
    }
}
def generate_ios_watch():
    for role in ios_watch_icons.keys():
        for subtype in ios_watch_icons[role].keys():
            output = '{}/{}{}.png'.format(ios_watch_path, role, subtype)
            size = ios_watch_icons[role][subtype]
            generate_icon(icon_main, output, size)

def generate_ios_watch_content():
    ios_watch_content = {
        'images': [],
        'info': { 'version': 1, 'author': 'xcode' }
    }
    for role in ios_watch_icons.keys():
        for name in ios_watch_icons[role].keys():
            scale = name.split('@')[1]
            size = ios_watch_icons[role][name] / int(scale.split('x')[0])
            filename = '{}{}.png'.format(role, name)
            data = {
                'size': '{}x{}'.format(size, size),
                'idiom': 'watch',
                'filename': filename,
                'scale': scale,
                'role': role,
            }
            subtype = name.split('@')[0]
            if subtype != '':
                data['subtype'] = subtype
            ios_watch_content['images'].append(data)
    with open('{}/Contents.json'.format(ios_watch_path), 'w') as contents:
        json.dump(ios_watch_content, contents)


# iOS watch extension
ios_watch_extension_path = 'ios/Watch\ Extension/Assets.xcassets/Complication.complicationset'
ios_watch_extension_icons = {
    'Modular': {
        '38mm@2x': 52,
        '42mm@2x': 58
    },
    'Utilitarian': {
        '38mm@2x': 40,
        '42mm@2x': 44
    },
    'Extra\ Large': {
        '38mm@2x': 182,
        '42mm@2x': 203
    },
    'Circular': {
        '38mm@2x': 32,
        '42mm@2x': 36
    }
}
def generate_ios_watch_extension():
    for complication in ios_watch_extension_icons.keys():
        folder = '{}/{}.imageset'.format(ios_watch_extension_path, complication)
        for name in ios_watch_extension_icons[complication].keys():
            output = '{}/{}.png'.format(folder, name)
            size = ios_watch_extension_icons[complication][name]
            generate_icon(icon_alpha, output, size)

def generate_ios_watch_extension_content():
    return


# Let's do magic
generate_android()
generate_ios()
generate_ios_content()
generate_ios_watch()
generate_ios_watch_content()
generate_ios_watch_extension()
# generate_ios_watch_extension_content()
