from subprocess import check_output

def call(args):
    command_args = []
    for arg in args.replace('\\ ', '\\').split(' '):
        # print('arg: {}'.format(arg))
        # if arg == '$':
            # command_args.append('\\ ')
        if not '\\' in arg:
            command_args.append(arg)
            continue
        command_arg = ''
        for letter in arg:
            command_arg += letter
            if letter == '\\':
                command_arg = command_arg[:-1]
                command_arg += ' '
        # print('command_arg: {}'.format(command_arg))
        command_args.append(command_arg)
    # print(command_args)
    return check_output(command_args)
    # return check_output(args.split(' ').map)

# print(call('ls /Users/Nico/Desktop/WifiUC/ios/Watch\ Extension/Assets.xcassets'))
