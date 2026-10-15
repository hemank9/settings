import os
from flask import Flask, render_template

app = Flask(__name__)
PAGES = {
    '/': ('home', 'My Profile'),
    '/profile': ('profile', 'Profile'),
    '/settings': ('settings', 'Settings'),
    '/notifications': ('notifications', 'Notification Setting'),
    '/password': ('password', 'Password Manager'),
    '/help': ('faq', 'Help Center'),
    '/help/contact': ('contact', 'Help Center'),
    '/privacy': ('privacy', 'Privacy Policy'),
    '/logout': ('logout', 'My Profile'),
    '/welcome': ('welcome', 'Welcome'),
}

def screen():
    from flask import request
    page, title = PAGES[request.path]
    return render_template('screen.html', page=page, title=title)

for index, path in enumerate(PAGES):
    app.add_url_rule(path, endpoint=f'screen_{index}', view_func=screen)

@app.get('/health')
def health():
    return {'status': 'ok'}

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=int(os.environ.get('PORT', 5000)))
