# -*- coding: utf-8 -*-
"""Single function to gather and expose REST endpoints from submodules."""

from . import inspections, meditech, omnicell, organization, statstock, status


def add_resources(api):
    """Instantiate the Flask app.

    Args:
        api (Api): A flask_restful instance.

    """

    def add(resource, *args):
        api.add_resource(resource, *args)

    # Inspections
    add(inspections.CategoriesResource, "/inspections/categories/")
    add(inspections.CriteriaResource, "/inspections/criteria/")
    add(
        inspections.LocationCriteriaResource,
        "/inspections/locations/<int:location>",
    )
    add(inspections.NewRecordResource, "/inspections/record/new/<int:location>")
    add(inspections.RecordResource, "/inspections/records/<int:record>")
    add(inspections.RecordsResource, "/inspections/records/")
    add(inspections.ResultsResource, "/inspections/results/<int:record>")

    # Meditech
    add(meditech.Transaction, "/meditech/transaction/")

    # Omnicell
    add(omnicell.ExceptionsResource, "/omnicell/exceptions/")
    add(omnicell.ExpirationResource, "/omnicell/expiration/")
    add(omnicell.IVResource, "/omnicell/iv/")
    add(omnicell.RepackagingResource, "/omnicell/repackaging/")
    add(omnicell.OmniResource, "/omnicell/omnis/<string:omni>")
    add(omnicell.MainResource, "/omnicell/main/<string:omni>")
    add(omnicell.OmnisResource, "/omnicell/omnis/")
    add(omnicell.CensusResource, "/omnicell/census/")
    add(omnicell.PopulationsResource, "/omnicell/populations/")
    add(omnicell.WatchlistResource, "/omnicell/watchlist/")
    add(omnicell.StatusResource, "/omnicell/status/")

    # Organization
    add(organization.DepartmentResource, "/organization/departments/")
    add(
        organization.LocationResource,
        "/inspections/locations/",
        "/organization/locations/",
    )

    # Statstock
    add(statstock.PendingResource, "/statstock/pending/")
    add(statstock.TagResource, "/statstock/tag/<string:tag>")
    add(statstock.TagsResource, "/statstock/expiration/")

    # Status
    add(status.StatusBoardResource, "/status/")
