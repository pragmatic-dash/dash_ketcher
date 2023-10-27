import dash_ketcher
from dash import html, dcc, Dash
from dash import no_update, ctx, callback
from dash import Input, Output, State, ALL, Patch

app = Dash(__name__)

app.layout = html.Div([
    dcc.Input(
        id="mol-input",
        value='',
        style={
            "width": "calc(100% - 120px)",
            "margin-left": "5px",
            "display": "inline-block"
        }
    ),
    dash_ketcher.DashKetcher(id='component', molecule='', buttonLabel='Submit'),
])

@callback(
    Output('component', 'molecule'),
    Input('mol-input', 'value'),
)
def update_ketcher(value):
    if not value:
        return no_update
    return value


if __name__ == '__main__':
    app.run_server(debug=True)
