# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DashKetcher(Component):
    """A DashKetcher component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.

Keyword arguments:

- id (string; optional)

- input_molecule (string; optional)

- output_molecule (string; optional)

- style (dict; optional)"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_ketcher'
    _type = 'DashKetcher'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, input_molecule=Component.UNDEFINED, output_molecule=Component.UNDEFINED, style=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'input_molecule', 'output_molecule', 'style']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'input_molecule', 'output_molecule', 'style']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(DashKetcher, self).__init__(**args)
