
module DashKetcher
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.0.4"

include("jl/dashketcher.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "dash_ketcher",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "async-DashKetcher.js",
    external_url = "https://unpkg.com/dash_ketcher@0.0.4/dash_ketcher/async-DashKetcher.js",
    dynamic = nothing,
    async = :true,
    type = :js
),
DashBase.Resource(
    relative_package_path = "async-DashKetcher.js.map",
    external_url = "https://unpkg.com/dash_ketcher@0.0.4/dash_ketcher/async-DashKetcher.js.map",
    dynamic = true,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "dash_ketcher.min.js",
    external_url = nothing,
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "dash_ketcher.min.js.map",
    external_url = nothing,
    dynamic = true,
    async = nothing,
    type = :js
)
            ]
        )

    )
end
end
