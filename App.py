from flask import Flask, render_template, jsonify, request, redirect, url_for

app = Flask(__name__)

# Example components as functions
def global_styles():
    return "Global styles applied."

def sidebar(show, toggle):
    return f"Sidebar is {'visible' if show else 'hidden'}."

def header(toggle, sidebar_visible):
    return f"Header with sidebar visible: {sidebar_visible}"

# Example pages as routes
@app.route('/')
def swap():
    return jsonify({"page": "Swap", "content": "This is the swap page."})

@app.route('/limit')
def sample():
    return jsonify({"page": "Sample", "content": "This is the sample page."})

@app.route('/graphql')
def graphql_test():
    return jsonify({"page": "GraphQLTest", "content": "This is the GraphQL test page."})

@app.route('/graphql/<id>')
def character_summary(id):
    return jsonify({"page": "CharacterSummary", "id": id, "content": f"This is character summary for ID {id}."})

@app.route('/flashloan')
def flashloan():
    return jsonify({"page": "Flashloan", "content": "Flashloan functionality will be implemented soon."})

# Main app logic
@app.route('/app', methods=["GET"])
def main_app():
    show_sidebar = request.args.get('show_sidebar', 'false') == 'true'
    toggle_sidebar = not show_sidebar  # Example toggle logic
    return jsonify({
        "styles": global_styles(),
        "header": header(toggle_sidebar, show_sidebar),
        "sidebar": sidebar(show_sidebar, toggle_sidebar),
        "routes": [
            {"path": "/", "description": "Swap page"},
            {"path": "/limit", "description": "Sample page"},
            {"path": "/graphql", "description": "GraphQL test page"},
            {"path": "/flashloan", "description": "Flashloan functionality"}
        ]
    })

if __name__ == '__main__':
    app.run(debug=True)
