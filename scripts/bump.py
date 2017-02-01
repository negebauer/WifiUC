from subprocess import check_output
import json
import os

def call(command, shell=False):
    return check_output(command.split(' '), shell=shell)


def check_clean_git():
    print('Checking git status')
    changes = call('git status --porcelain')
    if changes != '':
        print('Git repository not clean, can\'t go on')
        exit()


# check_clean_git()
version_current = json.loads(open('package.json').read())['version']
print('Going to bump from {}'.format(version_current))
bump = raw_input('1. major (M)\n2. minor (m) \n3. patch (p)\n4. none (n)\n$ ')
if bump == '1' or bump == 'major' or bump == 'M':
    print('Major bump')
    version = call('npm version major')
elif bump == '2' or bump == 'minor' or bump == 'm':
    print('Minor bump')
    version = call('npm version minor')
elif bump == '3' or bump == 'patch' or bump == 'p':
    print('Patch bump')
    version = call('npm version patch')
elif bump == '4' or bump == 'none' or bump == 'n':
    version = version_current
    print('No bump')
else:
    print('Not recognized')
    exit()
print('New version {}'.format(version))
