# Replace the apple watch icon stuff
from call import call
import os

icon_path = './assets/icon.png'
temp_path = './assets/generated'
os.makedirs(temp_path)

def generate_icon(size, output):
    call('convert {} -resize {}x{} {}.png'.format(icon_path, size, size, output))

# Watch extension
watch_extension_path = temp_path + '/watch_extension'
os.makedirs(watch_extension_path)
sizes = {
    'modular': {
        '38mm@2x': '52',
        '42mm@2x': '58'
    },
    'utilitarian': {
        '38mm@2x': '40',
        '42mm@2x': '44'
    },
    'extra_large': {
        '38mm@2x': '182',
        '42mm@2x': '203'
    },
    'circular': {
        '38mm@2x': '32',
        '42mm@2x': '36'
    }
}
for group in sizes.keys():
    folder = '{}/{}'.format(watch_extension_path, group)
    os.makedirs(folder)
    for device in sizes[group].keys():
        path = '{}/{}'.format(folder, device)
        generate_icon(sizes[group][device], path)
