import dash_ketcher
from dash import html, dcc, Dash
from dash import no_update, ctx, callback
from dash import Input, Output, State, ALL, Patch
import os

os.environ["REACT_VERSION"]="18.2.0"

app = Dash(__name__)

app.layout = html.Div([
    dcc.Input(
        id="mol-input",
        value='',
        style={
            "width": "calc(100% - 120px)",
            "marginLeft": "5px",
            "display": "inline-block"
        }
    ),
    dash_ketcher.DashKetcher(id='component', input_molecule="", style={'height': '100px'}),
])

@callback(
    Output('component', 'input_molecule'),
    Input('mol-input', 'value'),
)
def update_ketcher(value):
    if not value:
        return no_update
    return value

@callback(
    Output('mol-input', 'value'),
    Input('component', 'output_molecule'),
)
def update_ketcher(value):
    if value:
        return value
    else:
        return no_update

if __name__ == '__main__':
    app.run_server(debug=True)
