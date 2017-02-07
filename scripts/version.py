from call import call

data = call('npm version')
version = str(data.split('\n')[0].split(': \'')[1].split('\',')[0])
print(version)
