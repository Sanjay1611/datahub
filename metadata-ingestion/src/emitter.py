import pydicom
import numpy as np
import os

import datahub.emitter.mce_builder as builder
from datahub.emitter.mcp import MetadataChangeProposalWrapper
from datahub.metadata.schema_classes import ChangeTypeClass, DicomInfoClass, BloodStatsClass

from datahub.emitter.rest_emitter import DatahubRestEmitter


def emit(path):
    # Create an emitter to DataHub over REST
    emitter = DatahubRestEmitter(gms_server="http://localhost:8080", extra_headers={})

    # Test the connection
    emitter.test_connection()

    dcm_meta = get_dcm_meta(path)
    if(dcm_meta==None):
        return
    print(f"data is {dcm_meta}")
    blood_stats=BloodStatsClass(rbcCount=dcm_meta.get('Blood_chemistry_stats').get('RBC_Count_M_perMcL'),
            wbcCount=dcm_meta.get('Blood_chemistry_stats').get('WBC_Count_M_perMcL'))
    # Construct a dataset properties object
    dicom_info = DicomInfoClass(patientName=dcm_meta.get('Name'),
             patientGender=dcm_meta.get('Gender'),
             patientDisease=dcm_meta.get('Disease'),
             embeddingVector=[5,10,15,20,33],
             bloodStats=blood_stats,
             fileURI="www.dell.com"
        )

    # Construct a MetadataChangeProposalWrapper object.
    metadata_event = MetadataChangeProposalWrapper(
        entityType="dicom",
        changeType=ChangeTypeClass.UPSERT,
        entityUrn=f"urn:li:dicom:{dcm_meta.get('Name')}",
        aspectName="dicomInfo",
        aspect=dicom_info,
    )

    # Emit metadata! This is a blocking call
    emitter.emit(metadata_event)
    print("Sent")

def get_dcm_meta(path):
  try:
    dataset = pydicom.dcmread(path)
    val = dataset[0x000b, 0x1008].value
    y = np.frombuffer(bytes(val, 'utf-8'))
    w = y.reshape(-1,2)
    z = w.tolist()
    orig = dict(enumerate(z,start =1))
    orig_it = orig.items()
    new = {str(key):val for key, val in orig_it}
    dcm_meta = {'Gender' : dataset.PatientSex,
                'Age' : dataset.PatientAge,
                'Name' : str(dataset.PatientName),
                'Disease': dataset[0x000b, 0x1004].value,
                'Blood_chemistry_stats': {
                    'RBC_Count_M_perMcL': dataset[0x000b, 0x1002][0],
                    'WBC_Count_K_perMcL': dataset[0x000b, 0x1002][1]
                    },
                'Blood_Image_recognition' : new
               }
    return dcm_meta
  except:
    print("Cannot parse data")

def emitWhole(directory):
    for root, dirs, files in os.walk(directory):
        for filename in files:
            emit(os.path.join(root, filename))

emitWhole("images")
#get_dcm_meta("images/BloodImage_00249.dcm")
