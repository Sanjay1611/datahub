package com.linkedin.datahub.graphql.types.dicom.mappers;

import com.linkedin.datahub.graphql.generated.Dicom;
import com.linkedin.datahub.graphql.generated.EntityType;
import javax.annotation.Nonnull;
import com.linkedin.data.DataMap;
import com.linkedin.common.urn.Urn;
import com.linkedin.dicom.DicomInfo;
import com.linkedin.dicom.BloodStats;
import com.linkedin.common.Ownership;
import com.linkedin.entity.EntityResponse;
import com.linkedin.entity.EnvelopedAspectMap;
import com.linkedin.metadata.Constants;
import com.linkedin.metadata.key.DicomKey;
import com.linkedin.datahub.graphql.types.common.mappers.util.MappingHelper;
import com.linkedin.datahub.graphql.types.mappers.ModelMapper;
import com.linkedin.datahub.graphql.types.common.mappers.OwnershipMapper;



public class DicomMapper implements ModelMapper<EntityResponse, Dicom> {

    public static final DicomMapper INSTANCE = new DicomMapper();

    public static Dicom map(@Nonnull final EntityResponse dataset) {
        return INSTANCE.apply(dataset);
    }
 
    @Override
    public Dicom apply(@Nonnull EntityResponse entityResponse) {
        final Dicom result = new Dicom();
        final Urn entityUrn = entityResponse.getUrn();
        final EnvelopedAspectMap aspects = entityResponse.getAspects();

        result.setUrn(entityUrn.toString());
        result.setType(EntityType.DICOM);

        EnvelopedAspectMap aspectMap = entityResponse.getAspects();
        MappingHelper<Dicom> mappingHelper = new MappingHelper<>(aspectMap, result);
        mappingHelper.mapToResult(Constants.DICOM_KEY_ASPECT_NAME, this::mapDicomKey);
        mappingHelper.mapToResult(Constants.DICOM_INFO_ASPECT_NAME, this::mapDicomInfo);
        mappingHelper.mapToResult(Constants.OWNERSHIP_ASPECT_NAME, (dicom, dataMap) ->
        dicom.setOwnership(OwnershipMapper.map(new Ownership(dataMap))));

        return result;
    }

    private void mapDicomKey(@Nonnull Dicom dicom, @Nonnull DataMap dataMap) {
        final DicomKey gmsKey = new DicomKey(dataMap);
        dicom.setDicomName(gmsKey.getDicomName());
    }

    private void mapDicomInfo(@Nonnull Dicom dicom, @Nonnull DataMap dataMap) {
        final DicomInfo gmsinfo = new DicomInfo(dataMap);
        final com.linkedin.datahub.graphql.generated.DicomInfo infoResult = new com.linkedin.datahub.graphql.generated.DicomInfo();
        infoResult.setPatientName(gmsinfo.getPatientName());
        infoResult.setPatientDisease(gmsinfo.getPatientDisease());
        infoResult.setFileURI(gmsinfo.getFileURI().toString());
        infoResult.setPatientGender(gmsinfo.getPatientGender());
        infoResult.setEmbeddingVector(gmsinfo.getEmbeddingVector());
        infoResult.setBloodStats(mapBloodStats(gmsinfo.getBloodStats()));
        dicom.setInfo(infoResult);
    }

    private static com.linkedin.datahub.graphql.generated.BloodStats mapBloodStats(final BloodStats bloodStats) {
        final com.linkedin.datahub.graphql.generated.BloodStats statsResult = new com.linkedin.datahub.graphql.generated.BloodStats();
        statsResult.setRbcCount(bloodStats.getRbcCount());
        statsResult.setWbcCount(bloodStats.getWbcCount());
        return statsResult;
    }

    private DicomMapper() { }
}
