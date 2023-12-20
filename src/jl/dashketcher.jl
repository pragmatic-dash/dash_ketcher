# AUTO GENERATED FILE - DO NOT EDIT

export dashketcher

"""
    dashketcher(;kwargs...)

A DashKetcher component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.
Keyword arguments:
- `id` (String; optional)
- `input_molecule` (String; optional)
- `output_molecule` (String; optional)
- `style` (Dict; optional)
"""
function dashketcher(; kwargs...)
        available_props = Symbol[:id, :input_molecule, :output_molecule, :style]
        wild_props = Symbol[]
        return Component("dashketcher", "DashKetcher", "dash_ketcher", available_props, wild_props; kwargs...)
end

