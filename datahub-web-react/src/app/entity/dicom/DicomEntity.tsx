import * as React from 'react';
import { DatabaseFilled, DatabaseOutlined } from '@ant-design/icons';
import { Entity, IconStyleType, PreviewType } from '../Entity';
import { Dicom, EntityType, SearchResult } from '../../../types.generated';
import { Preview } from './preview/Preview';
import { EntityProfile } from '../shared/containers/profile/EntityProfile';
import { useUpdateDatasetMutation } from '../../../graphql/dataset.generated';
import { useGetDicomQuery } from '../../../graphql/dicom.generated';
import { SchemaTab } from '../shared/tabs/Dataset/Schema/SchemaTab';
import ViewDefinitionTab from '../shared/tabs/Dataset/View/ViewDefinitionTab';
import { DocumentationTab } from '../shared/tabs/Documentation/DocumentationTab';
import { PropertiesTab } from '../shared/tabs/Properties/PropertiesTab';
import { LineageTab } from '../shared/tabs/Lineage/LineageTab';
import QueriesTab from '../shared/tabs/Dataset/Queries/QueriesTab';
import StatsTab from '../shared/tabs/Dataset/Stats/StatsTab';
import { ValidationsTab } from '../shared/tabs/Dataset/Validations/ValidationsTab';
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
                    name: 'Schema',
                    component: SchemaTab,
                },
                {
                    name: 'View Definition',
                    component: ViewDefinitionTab,
                    display: {
                        visible: () => true,
                        enabled: () => false,
                    },
                },
                {
                    name: 'Documentation',
                    component: DocumentationTab,
                },
                {
                    name: 'Properties',
                    component: PropertiesTab,
                },
                {
                    name: 'Lineage',
                    component: LineageTab,
                },
                {
                    name: 'Queries',
                    component: QueriesTab,
                },
                {
                    name: 'Stats',
                    component: StatsTab,
                },
                {
                    name: 'Validation',
                    component: ValidationsTab,
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

    getOverridePropertiesFromEntity = (data: Dicom) => {
        return {
            name: data.dicomName,
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
