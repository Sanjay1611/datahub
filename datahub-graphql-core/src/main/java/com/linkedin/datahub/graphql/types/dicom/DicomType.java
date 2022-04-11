package com.linkedin.datahub.graphql.types.dicom;

import com.google.common.collect.ImmutableSet;
import com.linkedin.data.template.StringArray;
import com.linkedin.datahub.graphql.QueryContext;
import com.linkedin.datahub.graphql.generated.Dicom;
import com.linkedin.datahub.graphql.generated.AutoCompleteResults;
import com.linkedin.datahub.graphql.generated.BrowsePath;
import com.linkedin.datahub.graphql.generated.BrowseResults;
import com.linkedin.datahub.graphql.generated.EntityType;
import com.linkedin.datahub.graphql.generated.FacetFilterInput;
import com.linkedin.datahub.graphql.generated.SearchResults;
import com.linkedin.datahub.graphql.resolvers.ResolverUtils;
import com.linkedin.common.urn.Urn;
import com.linkedin.datahub.graphql.types.SearchableEntityType;
import com.linkedin.datahub.graphql.types.dicom.mappers.DicomMapper;
import com.linkedin.datahub.graphql.types.mappers.AutoCompleteResultsMapper;
import com.linkedin.datahub.graphql.types.mappers.BrowsePathsMapper;
import com.linkedin.datahub.graphql.types.mappers.BrowseResultMapper;
import com.linkedin.datahub.graphql.types.mappers.UrnSearchResultsMapper;
import com.linkedin.entity.EntityResponse;
import com.linkedin.metadata.search.SearchResult;
import com.linkedin.metadata.browse.BrowseResult;
import com.linkedin.metadata.query.AutoCompleteResult;
import com.linkedin.datahub.graphql.types.BrowsableEntityType;
import com.linkedin.entity.client.EntityClient;
import graphql.execution.DataFetcherResult;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static com.linkedin.datahub.graphql.Constants.BROWSE_PATH_DELIMITER;
import static com.linkedin.metadata.Constants.*;

public class DicomType implements SearchableEntityType<Dicom>, BrowsableEntityType<Dicom> {
    private static final Set<String> ASPECTS_TO_FETCH = ImmutableSet.of(
            DICOM_KEY_ASPECT_NAME,
            BROWSE_PATHS_ASPECT_NAME,
            DICOM_INFO_ASPECT_NAME,
            OWNERSHIP_ASPECT_NAME
    );

    private static final Set<String> FACET_FIELDS = ImmutableSet.of("name");
    private static final String ENTITY_NAME = "dicom";

    private final EntityClient _entityClient;

    public DicomType(final EntityClient entityClient) {
        _entityClient = entityClient;
    }

    @Override
    public Class<Dicom> objectClass() {
        return Dicom.class;
    }

    @Override
    public EntityType type() {
        return EntityType.DICOM;
    }

    @Override
    public List<DataFetcherResult<Dicom>> batchLoad(@Nonnull List<String> urns, @Nonnull QueryContext context) throws Exception {
        final List<Urn> dicomUrns = urns.stream()
                .map(this::getUrn)
                .collect(Collectors.toList());

        try {
            final Map<Urn, EntityResponse> entities = _entityClient.batchGetV2(
                    DICOM_ENTITY_NAME,
                    new HashSet<>(dicomUrns),
                    ASPECTS_TO_FETCH,
                    context.getAuthentication());

            final List<EntityResponse> gmsResults = new ArrayList<>();
            for (Urn urn : dicomUrns) {
                gmsResults.add(entities.getOrDefault(urn, null));
            }
            return gmsResults.stream()
                    .map(gmsResult ->
                            gmsResult == null ? null : DataFetcherResult.<Dicom>newResult()
                                    .data(DicomMapper.map(gmsResult))
                                    .build()
                    )
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Failed to batch load Dicoms", e);
        }
    }

    @Override
    public BrowseResults browse(@Nonnull List<String> path,
                                @Nullable List<FacetFilterInput> filters,
                                int start,
                                int count,
                                @Nonnull final QueryContext context) throws Exception {
        final Map<String, String> facetFilters = ResolverUtils.buildFacetFilters(filters, FACET_FIELDS);
        final String pathStr = path.size() > 0 ? BROWSE_PATH_DELIMITER + String.join(BROWSE_PATH_DELIMITER, path) : "";
        final BrowseResult result = _entityClient.browse(
                ENTITY_NAME,
                pathStr,
                facetFilters,
                start,
                count,
                context.getAuthentication());
        return BrowseResultMapper.map(result);
    }

    @Override
    public List<BrowsePath> browsePaths(@Nonnull String urn, @Nonnull final QueryContext context) throws Exception {
        final StringArray result = _entityClient.getBrowsePaths(getUrn(urn), context.getAuthentication());
        return BrowsePathsMapper.map(result);
    } 

    @Override
    public SearchResults search(@Nonnull String query,
                                @Nullable List<FacetFilterInput> filters,
                                int start,
                                int count,
                                @Nonnull final QueryContext context) throws Exception {
        final Map<String, String> facetFilters = ResolverUtils.buildFacetFilters(filters, FACET_FIELDS);
        final SearchResult searchResult = _entityClient.search(ENTITY_NAME, query, facetFilters, start, count, context.getAuthentication());
        return UrnSearchResultsMapper.map(searchResult);
    }

    @Override
    public AutoCompleteResults autoComplete(@Nonnull String query,
                                            @Nullable String field,
                                            @Nullable List<FacetFilterInput> filters,
                                            int limit,
                                            @Nonnull final QueryContext context) throws Exception {
        final Map<String, String> facetFilters = ResolverUtils.buildFacetFilters(filters, FACET_FIELDS);
        final AutoCompleteResult result = _entityClient.autoComplete(ENTITY_NAME, query, facetFilters, limit, context.getAuthentication());
        return AutoCompleteResultsMapper.map(result);
    }

    private Urn getUrn(final String urnStr) {
        try {
            return Urn.createFromString(urnStr);
        } catch (URISyntaxException e) {
            throw new RuntimeException(String.format("Failed to convert urn string %s into Urn", urnStr));
        }
    }
}
