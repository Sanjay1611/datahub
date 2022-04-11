package com.linkedin.datahub.graphql.resolvers.dicom;

import com.linkedin.common.urn.Urn;
import com.linkedin.datahub.graphql.QueryContext;
import com.linkedin.datahub.graphql.generated.Dicom;
import com.linkedin.datahub.graphql.generated.ListDicomInput;
import com.linkedin.datahub.graphql.generated.ListDicomResult;
import com.linkedin.datahub.graphql.types.dicom.mappers.DicomMapper;
import com.linkedin.entity.EntityResponse;
import com.linkedin.entity.client.EntityClient;
import com.linkedin.metadata.Constants;
import com.linkedin.metadata.query.ListResult;
import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;
import java.util.Collections;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import java.util.concurrent.CompletableFuture;

import static com.linkedin.datahub.graphql.resolvers.ResolverUtils.*;


/**
 * Resolver used for listing all Domains defined within DataHub. Requires the MANAGE_DOMAINS platform privilege.
 */
public class ListDicomResolver implements DataFetcher<CompletableFuture<ListDicomResult>> {

  private static final Integer DEFAULT_START = 0;
  private static final Integer DEFAULT_COUNT = 20;

  private final EntityClient _entityClient;

  public ListDicomResolver(final EntityClient entityClient) {
    _entityClient = entityClient;
  }

  @Override
  public CompletableFuture<ListDicomResult> get(final DataFetchingEnvironment environment) throws Exception {

    final QueryContext context = environment.getContext();

    return CompletableFuture.supplyAsync(() -> {

    //   if (AuthorizationUtils.can(context)) {
        final ListDicomInput input = bindArgument(environment.getArgument("input"), ListDicomInput.class);
        final Integer start = input.getStart() == null ? DEFAULT_START : input.getStart();
        final Integer count = input.getCount() == null ? DEFAULT_COUNT : input.getCount();

        try {
          // First, get all group Urns.
          final ListResult gmsResult = _entityClient.list(
                  Constants.DICOM_ENTITY_NAME,
                  Collections.emptyMap(),
                  start,
                  count,
                  context.getAuthentication());

          // Then, get hydrate all users.
          final Map<Urn, EntityResponse> entities = _entityClient.batchGetV2(Constants.DICOM_ENTITY_NAME,
              new HashSet<>(gmsResult.getEntities()), null, context.getAuthentication());

          // Now that we have entities we can bind this to a result.
          final ListDicomResult result = new ListDicomResult();
          result.setStart(gmsResult.getStart());
          result.setCount(gmsResult.getCount());
          result.setTotal(gmsResult.getTotal());
          result.setDicomFiles(mapEntities(entities.values()));
          return result;
        } catch (Exception e) {
          throw new RuntimeException("Failed to list domains", e);
        }
    });
  }

  // This method maps urns returned from the list endpoint into Partial Domain objects which will be resolved be a separate Batch resolver.
  private List<Dicom> mapEntities(final Collection<EntityResponse> entities) {
    return entities.stream()
        .map(DicomMapper::map)
        .collect(Collectors.toList());
  }
}