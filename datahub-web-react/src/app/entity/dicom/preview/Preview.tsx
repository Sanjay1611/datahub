import React from 'react';
import { EntityType } from '../../../../types.generated';
import DefaultPreviewCard from '../../../preview/DefaultPreviewCard';
import { useEntityRegistry } from '../../../useEntityRegistry';

export const Preview = ({ urn, name }: { urn: string; name: string }): JSX.Element => {
    const entityRegistry = useEntityRegistry();
    return <DefaultPreviewCard url={entityRegistry.getEntityUrl(EntityType.Dicom, urn)} name={name || ''} />;
};
