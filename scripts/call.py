from subprocess import check_output

def call(args):
    return check_output(args.split(' '))
