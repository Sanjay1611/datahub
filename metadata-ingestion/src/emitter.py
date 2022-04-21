import pydicom
import numpy as np
import os

import datahub.emitter.mce_builder as builder
from datahub.emitter.mcp import MetadataChangeProposalWrapper
from datahub.metadata.schema_classes import ChangeTypeClass, DicomInfoClass, BloodStatsClass, BrowsePathsClass
from datahub.emitter.kafka_emitter import DatahubKafkaEmitter, KafkaEmitterConfig

#from datahub.emitter.rest_emitter import DatahubRestEmitter

def send_dicom_mce_via_kafka(dicomObj, name):

    # Create an emitter to Kafka
    kafka_config = {
        "connection": {
            "bootstrap": "localhost:9092",
            "schema_registry_url": "http://localhost:8081",
            "schema_registry_config": {}, # schema_registry configs passed to underlying schema registry client
            "producer_config": {}, # extra producer configs passed to underlying kafka producer
        }
    }

    emitter = DatahubKafkaEmitter(
        KafkaEmitterConfig.parse_obj(kafka_config)
    )

    browsePaths = BrowsePathsClass(paths=["/"+name])
    urnPrefix = "urn:li:dicom"
    urn = urnPrefix+":"+name

     #Construct a MetadataChangeProposalWrapper object.
    metadata_event = MetadataChangeProposalWrapper(
        entityType="dicom",
        changeType=ChangeTypeClass.UPSERT,
        entityUrn=urn,
        aspectName="dicomInfo",
        aspect=dicomObj,
    )

    path_event = MetadataChangeProposalWrapper(
        entityType="dicom",
        changeType=ChangeTypeClass.UPSERT,
        entityUrn=urn,
        aspectName="browsePaths",
        aspect=browsePaths,
    )

    emitter.emit(
    path_event,
    callback=lambda exc, message: print(f"Message sent to topic:{message.topic()}, partition:{message.partition()}, offset:{message.offset()}") if message else print(f"Failed to send with: {exc}")
    )

    # Emit metadata! This is a non-blocking call
    emitter.emit(
    metadata_event,
    callback=lambda exc, message: print(f"Message sent to topic:{message.topic()}, partition:{message.partition()}, offset:{message.offset()}") if message else print(f"Failed to send with: {exc}")
    )

    #Send all pending events
    emitter.flush()


def emit(path):
    # Create an emitter to DataHub over REST
    #emitter = DatahubRestEmitter(gms_server="http://localhost:8080", extra_headers={})

    # Test the connection
    #emitter.test_connection()

    dcm_meta = get_dcm_meta(path)
    if(dcm_meta==None):
        return
    print(f"data is {dcm_meta}")
    #wbcCount = 0 if dcm_meta.get('Blood_chemistry_stats').get('WBC_Count_M_perMcL') == 'None' else  dcm_meta.get('Blood_chemistry_stats').get('WBC_Count_M_perMcL')
    blood_stats=BloodStatsClass(rbcCount=round(dcm_meta.get('Blood_chemistry_stats').get('RBC_Count_M_perMcL')),
            wbcCount=round(dcm_meta.get('Blood_chemistry_stats').get('WBC_Count_K_perMcL')))
    # Construct a dataset properties object
    dicom_info = DicomInfoClass(patientName=dcm_meta.get('Name'),
             patientGender=dcm_meta.get('Gender'),
             patientDisease=dcm_meta.get('Disease'),
             embeddingVector=[5,10,15,20,33],
             bloodStats=blood_stats,
             fileURI="www.dell.com"
        )
    send_dicom_mce_via_kafka(dicomObj=dicom_info, name=dcm_meta.get('Name'))

    # # Construct a MetadataChangeProposalWrapper object.
    # metadata_event = MetadataChangeProposalWrapper(
    #     entityType="dicom",
    #     changeType=ChangeTypeClass.UPSERT,
    #     entityUrn=f"urn:li:dicom:{dcm_meta.get('Name')}",
    #     aspectName="dicomInfo",
    #     aspect=dicom_info,
    # )

    # # Emit metadata! This is a blocking call
    # emitter.emit(metadata_event)
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
