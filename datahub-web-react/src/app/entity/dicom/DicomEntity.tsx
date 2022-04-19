import * as React from 'react';
import { DatabaseFilled, DatabaseOutlined } from '@ant-design/icons';
import { Entity, IconStyleType, PreviewType } from '../Entity';
import { Dicom, EntityType, SearchResult, StringMapEntry } from '../../../types.generated';
import { Preview } from './preview/Preview';
import { EntityProfile } from '../shared/containers/profile/EntityProfile';
import { useUpdateDatasetMutation } from '../../../graphql/dataset.generated';
import { useGetDicomQuery } from '../../../graphql/dicom.generated';
import { DocumentationTab } from '../shared/tabs/Documentation/DocumentationTab';
import { PropertiesTab } from '../shared/tabs/Properties/PropertiesTab';
import { getDataForEntityType } from '../shared/containers/profile/utils';
import { SidebarAboutSection } from '../shared/containers/profile/sidebar/SidebarAboutSection';
import { SidebarOwnerSection } from '../shared/containers/profile/sidebar/Ownership/SidebarOwnerSection';

/**
 * Definition of the DataHub Dataset entity.
 */
export class DicomEntity implements Entity<Dicom> {
    type: EntityType = EntityType.Dicom;

    icon = (fontSize: number, styleType: IconStyleType) => {
        if (styleType === IconStyleType.TAB_VIEW) {
            return <DatabaseOutlined style={{ fontSize }} />;
        }

        if (styleType === IconStyleType.HIGHLIGHT) {
            return <DatabaseFilled style={{ fontSize, color: '#B37FEB' }} />;
        }

        if (styleType === IconStyleType.SVG) {
            return (
                <path d="M832 64H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-600 72h560v208H232V136zm560 480H232V408h560v208zm0 272H232V680h560v208zM304 240a40 40 0 1080 0 40 40 0 10-80 0zm0 272a40 40 0 1080 0 40 40 0 10-80 0zm0 272a40 40 0 1080 0 40 40 0 10-80 0z" />
            );
        }

        return (
            <DatabaseOutlined
                style={{
                    fontSize,
                    color: '#BFBFBF',
                }}
            />
        );
    };

    displayName = (dicom: Dicom) => {
        return dicom?.dicomName;
    };

    isSearchEnabled = () => true;

    isBrowseEnabled = () => true;

    isLineageEnabled = () => false;

    getAutoCompleteFieldName = () => 'dicomName';

    getPathName = () => 'dicom';

    getEntityName = () => 'Dicom';

    getCollectionName = () => 'Dicoms';

    renderPreview = (_: PreviewType, dicom: Dicom) => {
        return <Preview urn={dicom.urn} name={dicom.dicomName} />;
    };

    renderSearch = (result: SearchResult) => {
        const dicom = result.entity as Dicom;
        return <Preview urn={dicom.urn} name={dicom.dicomName} />;
    };

    renderProfile = (urn: string) => (
        <EntityProfile
            urn={urn}
            entityType={EntityType.Dicom}
            useEntityQuery={useGetDicomQuery}
            useUpdateQuery={useUpdateDatasetMutation}
            getOverrideProperties={this.getOverridePropertiesFromEntity}
            tabs={[
                {
                    name: 'View Properties',
                    component: PropertiesTab,
                    display: {
                        visible: () => true,
                        enabled: () => true,
                    },
                },
                {
                    name: 'Documentation',
                    component: DocumentationTab,
                },
            ]}
            sidebarSections={[
                {
                    component: SidebarAboutSection,
                },
                {
                    component: SidebarOwnerSection,
                    properties: {
                        hideOwnerType: true,
                    },
                },
            ]}
        />
    );

    getProperties = (data: Dicom): StringMapEntry[] => {
        const rbc = data.info?.bloodStats.rbcCount as any as string;
        const wbc = data.info?.bloodStats.rbcCount as any as string;
        const vector = data.info?.embeddingVector as any as string;
        return [
            { key: 'patientName', value: data?.info?.patientName, __typename: 'StringMapEntry' },
            { key: 'patientGender', value: data?.info?.patientGender, __typename: 'StringMapEntry' },
            { key: 'patientDisease', value: data?.info?.patientDisease, __typename: 'StringMapEntry' },
            { key: 'fileURI', value: data?.info?.fileURI, __typename: 'StringMapEntry' },
            { key: 'rbc', value: rbc, __typename: 'StringMapEntry' },
            { key: 'wbc', value: wbc, __typename: 'StringMapEntry' },
            { key: 'embeddingVector', value: vector, __typename: 'StringMapEntry' },
        ];
    };

    getOverridePropertiesFromEntity = (data: Dicom) => {
        return {
            name: data?.dicomName,
            customProperties: this.getProperties(data),
            patientName: data.info?.patientName,
        };
    };

    getGenericEntityProperties = (data: Dicom) => {
        return getDataForEntityType({
            data,
            entityType: this.type,
            getOverrideProperties: this.getOverridePropertiesFromEntity,
        });
    };
}
